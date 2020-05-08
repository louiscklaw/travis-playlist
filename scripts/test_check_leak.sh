#!/usr/bin/env bash

set -ex

cd travis-check-leak
  pipenv sync

  pipenv run python3 test_pass.py

cd ..