#!/usr/bin/env bash

set -ex

git fetch --all

git merge origin/develop
git merge origin/master

./scripts/pre-commit.sh

# scripts/test_dashboard.sh
# scripts/docker-lint.sh &
# scripts/travis-lint.sh &


wait
