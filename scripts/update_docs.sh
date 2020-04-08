#!/usr/bin/env bash

set -ex

cd _dashboard/content/travis-build-status
  ./gen_table.py
cd -

cd _dashboard
  hugo -D -d ../docs
cd -