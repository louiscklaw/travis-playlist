#!/usr/bin/env bash

set -ex

yarn clean

yarn build

rm -rf ../gh-pages

cp -R public/ ../gh-pages