#!/usr/bin/env bash

set -ex

pipenv sync
pipenv run python3 test-remote-branch.py
