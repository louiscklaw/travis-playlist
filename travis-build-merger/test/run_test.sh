#!/usr/bin/env bash

# this is the main test script

set -e

# ./scripts/prepare_git.sh

# sudo apt update
# sudo apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
# python3 -m pip install pipenv

pipenv sync

pipenv run python3 ./test/test.py
pipenv run python3 ./test/test_checkout_non_exist_branch.py
