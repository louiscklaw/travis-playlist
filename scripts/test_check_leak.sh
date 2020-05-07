#!/usr/bin/env bash

set -ex

sudo apt update
sudo apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
pip3 install --user pipenv
pipenv sync

python3 travis-check-leak/test_pass.py
