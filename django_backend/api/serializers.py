from rest_framework import serializers
from .models import AlignmentRun, Alignment


class AlignmentRunSerializer(serializers.ModelSerializer):

    class Meta:
        model = AlignmentRun
        fields = ('pk',
                  'name',
                  'description',
                  'query',
                  'submitted_at',
                  'completed_at')


class AlignmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Alignment
        fields = ('pk',
                  'alignment_run_fk',
                  'protein_ref_seq',
                  'genome_ref_seq',
                  'start_position',
                  'end_position')
