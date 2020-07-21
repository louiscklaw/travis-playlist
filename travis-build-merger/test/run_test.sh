#!/usr/bin/env bash

# this is the main test script

set -e

reset

# ./scripts/prepare_git.sh

python3 ./test/test.py
