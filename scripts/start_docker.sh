#!/usr/bin/env bash

set -ex

docker run -it -v $PWD:/test -v /home/logic:/root -v /etc:/host/etc ubuntu:bionic bash