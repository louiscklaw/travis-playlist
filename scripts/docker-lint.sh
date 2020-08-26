#!/usr/bin/env bash

set -ex

for VARIABLE in `find . -name "dockerfile"`;
do
  dockerlint $VARIABLE &
done
