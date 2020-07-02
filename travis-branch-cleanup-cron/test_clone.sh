#!/usr/bin/env bash

set -ex

export DELETE_DAY_THRESHOLD=30
# export DRY_RUN=1

rm -rf /tmp/hko-weather-slackbot

pipenv sync
pipenv run python3 clean_remote_branch.py git@github.com:louiscklaw/hko-weather-slackbot.git
