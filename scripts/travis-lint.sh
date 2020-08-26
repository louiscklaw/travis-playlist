#!/usr/bin/env bash

set -ex


for l in $(find . -name .travis.yml -not -path "./node_modules/*"  -not -path "./build-dashboard/node_modules/*" );
do
  travis lint $l &
done;
