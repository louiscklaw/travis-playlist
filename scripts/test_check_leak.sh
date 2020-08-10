#!/usr/bin/env bash

set -ex

# apt update
# apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
# python3 -m pip install pipenv

# export PATH=$PATH:/root/.local/bin
# export LC_ALL=C.UTF-8
# export LANG=C.UTF-8

mkdir -p tmp

cd tmp
  # wget pipfile
  # wget check-leak.py

  # old check leak
  # cp ../travis-check-leak/Pipfile .
  # cp ../travis-check-leak/Pipfile.lock .
  # cp ../travis-check-leak/check-leak.py .
  # cp ../travis-check-leak/test_pass.py .

  # cp ../travis-check-leak/leak.js .

  # pipenv --rm || true
  # pipenv sync
  # pipenv run python3 test_pass.py


  rsync -avzh ../travis-check-leak/ .
  # pipenv --rm || true
  # pipenv sync

  # usecase
  pipenv run python3 main.py
  pipenv run python3 main.py $@

cd ..