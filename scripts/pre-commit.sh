#!/usr/bin/env bash

set -ex

PROJ_HOME=$PWD

# pre-commit check

# check_leak self check
scripts/test_check_leak.sh $PROJ_HOME

# done