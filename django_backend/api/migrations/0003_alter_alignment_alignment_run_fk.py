# Generated by Django 4.0.4 on 2022-05-29 17:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_rename_alignment_run_alignment_alignment_run_fk_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='alignment',
            name='alignment_run_fk',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.alignmentrun'),
        ),
    ]
