#!/usr/bin/env bash

set -ex

cd .travis
  wget https://raw.githubusercontent.com/louiscklaw/travis-playlist/master/travis-broadcast/Pipfile
  wget https://raw.githubusercontent.com/louiscklaw/travis-playlist/master/travis-broadcast/Pipfile.lock
  wget https://raw.githubusercontent.com/louiscklaw/travis-playlist/master/travis-broadcast/travis-broadcast.py

  chmod +x travis-broadcast.py

  sudo apt update
  sudo apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
  pip3 install --user pipenv

  pipenv sync
  pipenv run python3 travis-broadcast.py \#travis-build-result "testing post to travis-build-result"
  pipenv run python3 travis-broadcast.py need_help "testing post to travis-need-help"
cd -
