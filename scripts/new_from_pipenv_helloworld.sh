#!/usr/bin/env bash

set -x
rm -rf * .*

TEST=`echo $PWD|rev |cut -d'/' -f1 |rev`
git branch -D test/$TEST

set -ex
git checkout -b test/$TEST


rsync -avz ../travis-pipenv-helloworld/ .

./init.sh

./build.sh

git add .
git commit -m"feat: init commit from travis-pipenv-helloworld,"