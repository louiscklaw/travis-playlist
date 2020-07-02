#!/usr/bin/env bash

set -ex

# pipenv --rm
pipenv sync

echo "unit test"
# pipenv run python3 clean_remote_branch.py
pipenv run python3 test-remote-branch.py

echo "use case"
export DELETE_DAY_THRESHOLD=0.0001
export DRY_RUN=1

./use_case.sh

echo 'test done'
