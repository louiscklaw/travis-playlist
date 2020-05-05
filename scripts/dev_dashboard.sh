#!/usr/bin/env bash

set -ex

rsync -avzh build-dashboard/overlay/ build-dashboard

# ./scripts/gen_repo_table.py

cd build-dashboard
  hugo serve -D
cd -

# fallback overlayed change
cd build-dashboard/themes/minimal
  git checkout layouts/index.html
cd -

# done