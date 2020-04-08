#!/usr/bin/env bash

set -ex

cd travis-build-merger
  pipenv sync
  pipenv run python3 test.py
cd -
