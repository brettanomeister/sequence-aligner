from django_backend.celery import app
from Bio import pairwise2
from BioSQL import BioSeqDatabase
import requests


@app.task(bind=True,default_retry_delay=10)  # set a retry delay, 10 equal to 10s
def run_sequence_alignment_search(self, query: str):

    try:
        server = BioSeqDatabase.open_database(
            driver="psycopg2",
            user="postgres",
            passwd="postgres",
            host="db",
            db="postgres"
        )
        db = server["ginkgo"]
        sequence_records = db.items()

        search_records(query, sequence_records)
    except Exception as e:
        raise self.retry(exc=e)


def search_records(query: str, sequence_records):
    for sr in sequence_records:
        record = sr[1]
        search_record(query, record)


def search_record(query: str, record):
    alignments = []

    for feature in record.features:
        if 'product' in feature.qualifiers and 'protein' in ' '.join(feature.qualifiers['product']):
            feature_sequence = feature.extract(record.seq)
            alignment = search_feature(query, feature_sequence)
            if alignment is not None:
                alignments.append((alignment, feature))

    if len(alignments) > 0:
        persist_alignments(alignments, record)


def search_feature(query: str, feature_sequence: str):
    alignment = pairwise2.align.localms(
        feature_sequence,
        query,
        # 99% similarity
        match=1,
        mismatch=-3,
        # highly penalize gaps
        open=-12,
        extend=0,
        one_alignment_only=True
    )

    # return result if the alignment score is greater than 90% of the max possible score
    if alignment[0].score > (0.9 * (len(query) + 1)):
        return alignment[0]
    else:
        return None


def persist_alignments(alignments: list, record: tuple):
    for a in alignments:
        res = requests.post(
            "http://api:8000/api/alignments/",
            data={
                "protein_ref_seq": a[1].qualifiers["protein_id"][0],
                "genome_ref_seq": record.id,
                "matched_fragment": "abcd",
                "start_position": a[0].start,
                "end_position": a[0].end,
                "alignment_run_fk_id": 1  # TODO
            }
        )
