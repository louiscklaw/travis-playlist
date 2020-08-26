#!/usr/bin/env bash

set -ex

scripts/pre-commit.sh

# scripts/test_dashboard.sh
scripts/docker-lint.sh &
scripts/travis-lint.sh &
scripts/test-travis-build-merger.sh &
scripts/build-dashboard.sh &

wait
