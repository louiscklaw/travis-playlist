#!/usr/bin/env bash

set -ex

echo "hello publish.sh"

mkdir /tmp/gh-pages-out
touch /tmp/gh-pages-out/index.html

echo "helloworld" > /tmp/gh-pages-out/index.html