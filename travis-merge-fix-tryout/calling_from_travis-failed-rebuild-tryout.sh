#!/usr/bin/env bash

set -ex

pipenv sync
# pipenv run python3 test/test.py


pipenv run python3 src/main.py $@
# echo 'helloworld'
