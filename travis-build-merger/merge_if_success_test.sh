#!/usr/bin/env bash

# cd travis-build-merger/_util

# id
# sudo apt update
# sudo apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
# pip3 install --user pipenv
# pipenv sync
# pipenv run python3 ./merge.py

# cd -

set -e

mkdir -p .travis
cd .travis
  cp ../travis-build-merger/_util/merge.py .
  cp ../travis-build-merger/_util/Pipfile .
  cp ../travis-build-merger/_util/Pipfile.lock .

  chmod +x merge.py

  sudo apt update
  sudo apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
  pip3 install --user pipenv
  pipenv sync
  pipenv run python3 ./merge.py

cd -
