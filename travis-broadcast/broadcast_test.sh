#!/usr/bin/env bash

set -ex

sudo apt update
sudo apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
pip3 install --user pipenv

pipenv sync
pipenv run python3 travis-broadcast.py $1 "$2"