#!/usr/bin/env bash

set -ex

cd _dashboard/content/travis-build-status
  find . -name 'gen_table.py' |entr -c -s "./gen_table.py"

cd -