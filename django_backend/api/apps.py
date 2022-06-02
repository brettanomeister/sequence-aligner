from django.apps import AppConfig
from worker.init_BioSeqDb import run_init_BioSeqDb


class SeqalignConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        run_init_BioSeqDb()
