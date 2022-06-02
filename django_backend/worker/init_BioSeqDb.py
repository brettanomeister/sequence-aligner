from Bio import Entrez
from Bio import SeqIO
from BioSQL import BioSeqDatabase
import time


def run_init_BioSeqDb(self):

    server = BioSeqDatabase.open_database(
        driver="psycopg2",
        user="postgres",
        passwd="postgres",
        host="db",
        db="postgres"
    )

    db = server.new_database("ginkgo", description="genomes for mvp")
    db = server["ginkgo"]

    Entrez.api_key = "53f01e4342588b385fc495e98d7888be0808"
    Entrez.email = "emersonwd@gmail.com"

    genomes = ['NC_000852', 'NC_007346', 'NC_008724', 'NC_009899', 'NC_014637', 'NC_020104', 'NC_023423', 'NC_023640', 'NC_023719', 'NC_027867']

    for g in genomes:
        # Generous delay for Entrez's rate limit
        time.sleep(0.25)

        handle = Entrez.esearch(db="nuccore", term=g)
        record = Entrez.read(handle)
        gi_list = record['IdList']

        time.sleep(0.25)

        handle = Entrez.efetch(db="nuccore", id=gi_list, rettype="gb", retmode="text")
        records = SeqIO.parse(handle, "gb")

        count = db.load(records)
        print("Loaded %i records" % count)
        server.commit()
