#!/usr/bin/env bash

set -ex

# pre-commit check

# check_leak self check
scripts/test_check_leak.sh

# done