#!/usr/bin/env bash

set -ex

scripts/test_dashboard.sh

for l in $(find . -name .travis.yml -not -path "./node_modules/*");
do
  travis lint $l &
done;

for VARIABLE in `find . -name "dockerfile"`;
do
  dockerlint $VARIABLE &
done

wait

cd travis-build-merger
  pipenv sync
  pipenv run python3 test.py
cd -
