from django.db import models


class AlignmentRun(models.Model):
    name = models.CharField("Name", max_length=120)
    description = models.CharField("Description", max_length=240)
    query = models.TextField("Description")
    submitted_timestamp = models.DateTimeField("Submitted Timestamp", auto_now_add=True)
    completed_timestamp = models.DateTimeField("Compeleted Timestamp", auto_now_add=True)

    def __str__(self):
        return self.name


class Alignments(models.Model):
    alignment_run = models.ForeignKey(AlignmentRun, on_delete=models.CASCADE)
    protein_ref_seq = models.CharField("Protein Reference Sequence", max_length=120)
    genome_ref_seq = models.CharField("Genome Reference Sequence", max_length=120)
    matched_fragment = models.TextField("Matched Fragement")
    start_position = models.IntegerField("Start Position")
    end_position = models.IntegerField("End Position")

    def __str__(self):
        return self.protein_ref_seq
