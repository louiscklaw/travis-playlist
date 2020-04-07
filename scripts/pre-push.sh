#!/usr/bin/env bash

set -ex

for l in $(find . -name .travis.yml -not -path "./node_modules/*");
do
  travis lint $l &
done;

wait


for VARIABLE in `find . -name "dockerfile"`;
do
  dockerlint $VARIABLE &
done

wait