#!/usr/bin/env bash

set -ex

yarn
yarn clean

rm -rf public

yarn css-build
yarn build
