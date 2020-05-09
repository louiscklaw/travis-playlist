FROM ubuntu:18.04

# Install required software
# RUN apt-get update && \
#   apt-get install -y build-essential sudo git wget

RUN apt update
RUN apt install -y sudo
RUN apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
RUN python3 -m pip install pipenv

# TODO:
# export PATH=$PATH:/root/.local/bin
# export LC_ALL=C.UTF-8
# export LANG=C.UTF-8

RUN ls -l /root

ENTRYPOINT ["/docker-entrypoint.sh"]