#!/usr/bin/env bash

# this is the main test script

set -e

# ./scripts/prepare_git.sh

pipenv run python3 ./test/test.py
