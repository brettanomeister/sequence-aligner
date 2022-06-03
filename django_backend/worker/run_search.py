from django_backend.celery import app
from Bio import pairwise2
from BioSQL import BioSeqDatabase
import requests
import datetime

@app.task(bind=True,default_retry_delay=10)  # set a retry delay, 10 equal to 10s
def run_sequence_alignment_search(self, query: str, run_id: int):

    try:
        server = BioSeqDatabase.open_database(
            driver="psycopg2",
            user="postgres",
            passwd="postgres",
            host="db",
            db="postgres"
        )
        db = server["entrez"]
        sequence_records = db.items()

        search_records(query, run_id, sequence_records)
    except Exception as e:
        raise self.retry(exc=e)


def search_records(query: str, run_id: int, sequence_records):
    for sr in sequence_records:
        record = sr[1]
        search_record(query, run_id, record)

    log_run_complete(run_id)


def search_record(query: str, run_id: int, record):
    best_match = None

    for feature in record.features:
        if 'product' in feature.qualifiers and 'protein' in ' '.join(feature.qualifiers['product']):
            feature_sequence = feature.extract(record.seq)
            alignment = search_feature(query, feature_sequence)
            if best_match is not None and best_match[0].score < alignment.score:
                best_match = (alignment, feature)
            elif best_match is None:
                best_match = (alignment, feature)

    persist_alignment(best_match, record, run_id)


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

    return alignment[0]


def persist_alignment(best_match: tuple, record: tuple, run_id: int):
    res = requests.post(
        "http://api:8000/api/alignments/",
        data={
            "protein_ref_seq": best_match[1].qualifiers["protein_id"][0],
            "genome_ref_seq": record.id,
            "matched_fragment": "abcd",
            "start_position": best_match[0].start,
            "end_position": best_match[0].end,
            "alignment_run_fk": run_id
        }
    )

def log_run_complete(run_id: int):
    url = f"http://api:8000/api/alignment-runs/{run_id}"
    res = requests.request(
        "PATCH",
        url,
        data={"completed_at": datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S%z')}
    )
