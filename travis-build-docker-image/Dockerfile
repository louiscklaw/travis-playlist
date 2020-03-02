FROM ubuntu:18.04

# Install required software
RUN apt-get update && \
  apt-get install -y build-essential sudo git wget

ENTRYPOINT ["/docker-entrypoint.sh"]