#!/usr/bin/env bash

set -ex

rm -rf public
rm -rf ../gh-pages

./scripts/build.sh

cp -R public/ ../gh-pages
