#!/usr/bin/env bash

set -ex

wget https://raw.githubusercontent.com/louiscklaw/travis-playlist/master/travis-broadcast/Pipfile
wget https://raw.githubusercontent.com/louiscklaw/travis-playlist/master/travis-broadcast/Pipfile.lock
wget https://raw.githubusercontent.com/louiscklaw/travis-playlist/master/travis-broadcast/travis-broadcast.py

chmod +x travis-broadcast.py

sudo apt update
sudo apt install -y python3 python3-pip python3-dev python3-wheel python3-setuptools
pip3 install --user pipenv

pipenv sync
pipenv run python3 travis-broadcast.py $1 "$2"
