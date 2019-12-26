FROM zepan/licheepi

RUN rm -rf /var/lib/apt/lists/*
RUN sed -i "s|deb http://extras.ubuntu.com/ubuntu/ xenial main|# deb http://extras.ubuntu.com/ubuntu/ xenial main|g" /etc/apt/sources.list

RUN apt-get update
RUN apt-get install -y libssl-dev
