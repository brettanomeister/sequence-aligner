## ReadMe

#### Overview

The Sequence Alignment Matcher is a tool that allows a user to input a DNA sequence and recieve alignments against the set of reference library genomes.

The tool consists of a Django server, which both handles API traffic as well as serves a React SPA, a Celery worker for asynchronous alignment searches, and a RabbitMQ message broker which facilitates the invocation of the worker. A Postgres database supports the frontend, execution, and reference data needs of the tool.

These elements are dockerized, and the system is executed via `docker compose`

#### Sequence Alignment

The `BioPython` package is used heavily in support of the genetic data processing and handling. Local alignment searches are performed using the `pairwise2` module, with 1/-3 match/mismatch scoring for high specificity (99% similarity), and -12/0 open/extend scoring favoring alignments that are contiguous.

Where alignments are found in genomes with a positive score, they are compared on that basis and the highest scoring alignment for each genome is returned to the user. For longer sequences, such as `CCTTTTCTCTCGAGCGGAGGGAAAACGGAA` the search parameters may only yeild one alignment, `NP_048806.1`. Shorter sequences are more likely to find satisfactory alignment with a broader set of reference features.

Reference genomes are automatically loaded into Postgres from the NCBI Entrez database when the cluster is initiated. They are represented in the  `BioSQL` schema, a format that pairs well with `BioPython` for ergonomic data retrieval, manipulation, and persistence.

#### User Interface

A React SPA is served statically by Django, and provides the user with views of the runs they have initiated and the resulting alignments. Alignments are updated as they are discovered by the worker service, and the run is marked with a completed timestamp when it finishes.

#### Setup

The source code for this tool may be found on GitHub at [ginkgo-challenge](https://github.com/emerdenny/ginkgo-challenge) 

Local development is best served by an ide such as PyCharm or VSCode, where development can be done remotely in the hosting docker containers in the context of the other services. A simple run configuration can be set up to bring up the `docker compose` cluster and run the `npm start`command with one keystroke.

Running the project in a production environment is more complicated, but this is primarily due to cloud infrastructure setup. For example, to host the project on an AWS EC2 instance, the steps are as follows:

1. Provision an Ubuntu instance with up to 2 vCPUs (docker has the ability to run the webserver and worker containers in parallel) scaling workers and cores on a serverless platform like Fargate could be a good strategy as usage and dataset size grows.
2. Provision an ElasticIP address and associate it with the instance so that URL and/or DNS resolution will be predictable.
3. If desired, set up a hosted zone in Route53 and point the A records to your ElasticIP
4. SSH into the instance and install [docker](https://docs.docker.com/engine/install/ubuntu/) using the convenience script.
5. Attach to a `tmux` session and run `docker compose up` in the project root. Detatch the tmux session allowing your application to continue to run in a headless state. (You can also run docker in a headless state by passing the `-d` flag if you prefer)

You can see an example running at [www.ewd.tools](http://www.ewd.tools)
