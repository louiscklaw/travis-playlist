#!/usr/bin/env bash

set -ex

reset

sudo apt-get update
sudo apt-get install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
python3 -m pip install pipenv

export PYTHON_BIN_PATH="$(python3 -m site --user-base)/bin"
export PATH="$PATH:$PYTHON_BIN_PATH"
export LC_ALL=C.UTF-8
export LANG=C.UTF-8

pipenv sync

pipenv run python3 test/test.py