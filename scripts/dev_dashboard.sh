#!/usr/bin/env bash

set -ex

cp build-dashboard/overlay/themes/minimal/layouts/index.html build-dashboard/themes/minimal/layouts/index.html

cd build-dashboard
  hugo serve -D
cd -

# fallback overlayed change
cd build-dashboard/themes/minimal
  git checkout layouts/index.html
cd -

# done