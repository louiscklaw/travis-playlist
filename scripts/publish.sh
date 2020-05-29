#!/usr/bin/env bash

set -ex

GH_PAGES_DIR=../gh-pages

cd build-dashboard
  rm -rf ../gh-pages
  mkdir -p ../gh-pages

  echo helloworld > ../gh-pages/index.html

cd ..

#done
