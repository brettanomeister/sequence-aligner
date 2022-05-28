# Generated by Django 4.0.4 on 2022-05-28 18:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AlignmentRun',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120, verbose_name='Name')),
                ('description', models.CharField(max_length=240, verbose_name='Description')),
                ('query', models.TextField(verbose_name='Description')),
                ('submitted_at', models.DateTimeField(auto_now_add=True, verbose_name='Submitted At')),
                ('completed_at', models.DateTimeField(blank=True, null=True, verbose_name='Compeleted At')),
            ],
        ),
        migrations.CreateModel(
            name='Alignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('protein_ref_seq', models.CharField(max_length=120, verbose_name='Protein Reference Sequence')),
                ('genome_ref_seq', models.CharField(max_length=120, verbose_name='Genome Reference Sequence')),
                ('matched_fragment', models.TextField(verbose_name='Matched Fragement')),
                ('start_position', models.IntegerField(verbose_name='Start Position')),
                ('end_position', models.IntegerField(verbose_name='End Position')),
                ('alignment_run', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.alignmentrun')),
            ],
        ),
    ]
