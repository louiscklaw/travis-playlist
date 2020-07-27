#!/usr/bin/env bash

set -x

rm -rf * .*

TEST=`echo $PWD|rev |cut -d'/' -f1 |rev`
git branch -D test/$TEST
git checkout -b test/$TEST

set -ex

rsync -avz ../travis-helloworld/ .

sed "s/travis-helloworld/$TEST/g" .travis.yml > .new_travis.yml
mv .new_travis.yml .travis.yml

./init.sh

./build.sh

git add .
# git commit -m"feat: init commit from travis-helloworld,"