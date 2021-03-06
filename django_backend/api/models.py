from django.db import models


class AlignmentRun(models.Model):
    name = models.CharField("Name", max_length=120)
    description = models.CharField("Description", max_length=240)
    query = models.TextField("Description")
    submitted_at = models.DateTimeField("Submitted At", auto_now_add=True)
    completed_at = models.DateTimeField("Completed At", blank=True, null=True)

    def __str__(self):
        return self.name


class Alignment(models.Model):
    alignment_run_fk = models.ForeignKey(AlignmentRun, related_name="alignments", on_delete=models.SET_NULL, blank=True, null=True)
    protein_ref_seq = models.CharField("Protein Reference Sequence", max_length=120)
    genome_ref_seq = models.CharField("Genome Reference Sequence", max_length=120)
    start_position = models.IntegerField("Start Position")
    end_position = models.IntegerField("End Position")

    def __str__(self):
        return self.protein_ref_seq
