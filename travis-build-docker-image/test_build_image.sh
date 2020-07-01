#!/usr/bin/env bash

set -ex

cd travis-python
  docker build . -t logickee/travis-python
cd ..

cd travis-ubuntu
  docker build . -t logickee/travis-ubuntu
cd ..

docker run -it logickee/travis-ubuntu bash
# done