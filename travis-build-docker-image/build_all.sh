#!/usr/bin/env bash

set -ex

cd travis-firebase
  docker build -t logickee/travis-firebase . &
cd ..

cd travis-ubuntu
  docker build -t logickee/travis-ubuntu . &
cd ..

cd travis-python
  docker build -t logickee/travis-python . &
cd ..

cd travis-node
  docker build -t logickee/travis-node . &
cd ..

wait