#!/usr/bin/env bash

set -ex

pipenv run python3 travis-check-leak/test_pass.py
