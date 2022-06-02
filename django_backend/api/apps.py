from django.apps import AppConfig
from django.db.models.signals import post_migrate
from worker.init_BioSeqDb import init_BioSeqDB


class SeqalignConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        post_migrate.connect(init_BioSeqDB, sender=self)