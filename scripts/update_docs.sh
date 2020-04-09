#!/usr/bin/env bash

set -ex

cd _dashboard
  hugo -D -d ../docs
cd -