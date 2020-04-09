#!/usr/bin/env bash

set -ex

echo "helloworld"

cd _dashboard/content/travis-build-status
  ./gen_table.py
cd -

cd _dashboard
  hugo server -D --disableFastRender
cd -
