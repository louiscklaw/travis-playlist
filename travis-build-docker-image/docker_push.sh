#!/usr/bin/env bash

set -ex

docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASSWORD
docker push logickee/travis-python-test
docker push logickee/travis-ubuntu-test
docker logout

# done
