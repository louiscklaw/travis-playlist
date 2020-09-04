#!/usr/bin/env bash

set -ex

cd travis-failed-rebuild-tryout
  yarn
  node './index.js'
cd ..
