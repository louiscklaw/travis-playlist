#!/usr/bin/env bash

set -ex

yarn clean

rm -rf public

yarn css-build
yarn build
