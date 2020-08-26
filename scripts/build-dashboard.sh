#!/usr/bin/env bash

set -ex

echo 'test build dashboard'

cd build-dashboard
  mkdir -p ../gh-pages
  yarn
  yarn clean
  yarn build --prefix-paths
cd ..
