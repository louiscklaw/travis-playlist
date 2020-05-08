#!/usr/bin/env bash

set -ex

mkdir -p tmp

cd tmp
  # wget pipfile
  # wget check-leak.py
  cp ../travis-check-leak/Pipfile .
  cp ../travis-check-leak/Pipfile.lock .
  cp ../travis-check-leak/check-leak.py .
  cp ../travis-check-leak/test_pass.py .

  cp ../travis-check-leak/leak.js .

  pipenv sync

  pipenv run python3 test_pass.py

cd ..