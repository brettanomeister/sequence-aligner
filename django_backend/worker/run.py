from Bio import pairwise2
from BioSQL import BioSeqDatabase
import requests

server = BioSeqDatabase.open_database(
    driver="psycopg2",
    user="postgres",
    passwd="postgres",
    host="db",
    db="postgres"
)

db = server["ginkgo"]

sequence_records = db.items()

def search_records(query: str, sequence_records):
    for sr in sequence_records:
        record = sr[1]
        search_record(query, record)


def search_record(query: str, record) -> tuple:
    alignments = []

    for feature in record.features:
        if 'product' in feature.qualifiers and 'protein' in ' '.join(feature.qualifiers['product']):
            feature_sequence = feature.extract(record.seq)
            alignment = search_feature(query, feature_sequence)
            if alignment != None:
                alignments.append((alignment, feature))

    if len(alignments) > 0:
        persist_alignments(alignments, record)


def search_feature(query: str, feature_sequence: str) -> tuple:
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
        print(res)


search_records(
    "CCTTTTCTCTCGAGCGGAGGGAAAACGGAA",
    sequence_records
)

# top_match = {
#     "alignment": None,
#     "feature": None
# }
#
# scores = []
#
# for feature in seq_record.features:
#     if 'product' in feature.qualifiers and 'protein' in ' '.join(feature.qualifiers['product']):
#         alignment = pairwise2.align.localms(
#             feature.extract(seq_record.seq),
#             "CCTTTTCTCTCGAGCGGAGGGAAAACGGAA",
#             # 93% similarity
#             # match=5,
#             # mismatch=-9,
#             # 99% similarity
#             match=1,
#             mismatch=-3,
#             # highly penalize gaps
#             open=-12,
#             extend=0,
#             one_alignment_only=True
#         )
#
#         scores.append(alignment[0].score)
#
#         if top_match['alignment'] == None:
#             top_match['alignment'] = alignment[0]
#             top_match['feature'] = feature
#         elif top_match['alignment'].score < alignment[0].score:
#             top_match['alignment'] = alignment[0]
#             top_match['feature'] = feature
#
# print("score: " + str(top_match['alignment'].score) + " start: " + str(top_match['alignment'].start) + "  end: " + str(top_match['alignment'].end))
# print(top_match['feature'].qualifiers['protein_id'][0])
# scores.sort(reverse=True)
# score_mean = sum(scores)/len(scores)
# scores_variance = sum([((x - score_mean) ** 2) for x in scores])
# scores_std_dev = scores_variance ** 0.5
#
# score_deciles = [round(q, 1) for q in quantiles(scores, n=10)]
# outlier_threshold = score_deciles[8] + (1.5 * (score_deciles[8] - score_deciles[0]))
#
# remaining_scores = [x for x in scores if x > outlier_threshold]
#
# print('end test')
