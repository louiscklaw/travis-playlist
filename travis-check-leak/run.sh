#!/usr/bin/env bash

set -ex

rm -rf out.txt

# python3 ./main.py | sort > out.txt
pipenv run python3 ./main.py | sort > out.txt