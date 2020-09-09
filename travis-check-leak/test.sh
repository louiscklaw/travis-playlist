#!/usr/bin/env bash

set -ex

reset

pipenv sync

pipenv run python3 test/test.py