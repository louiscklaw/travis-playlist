#!/usr/bin/env bash

set -ex

rsync -avzh \
build-dashboard/overlay/themes/minimal/layouts/index.html \
build-dashboard/themes/minimal/layouts/index.html

rsync -avzh \
build-dashboard/overlay/themes/minimal/static/css/main.css \
build-dashboard/themes/minimal/static/css/main.css

# ./scripts/gen_repo_table.py

cd build-dashboard
  hugo serve -D
cd -

# fallback overlayed change
cd build-dashboard/themes/minimal
  git checkout layouts/index.html
cd -

# done