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
                  'alignment_run',
                  'protein_ref_seq',
                  'genome_ref_seq',
                  'matched_fragement',
                  'start_position',
                  'end_position')
