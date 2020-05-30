#!/usr/bin/env bash

set -ex

yarn clean

rm -rf public
rm -rf ../gh-pages

yarn css-build

yarn build

cp -R public/ ../gh-pages
