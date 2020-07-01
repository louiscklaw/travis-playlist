#!/usr/bin/env bash

set -ex

# docker run -it -v $PWD:/test -v /home/logic:/root -v /etc:/host/etc ubuntu:bionic bash

docker run -t -v $PWD:/test -v /etc:/host/etc ubuntu:bionic /test/scripts/local_test.sh
