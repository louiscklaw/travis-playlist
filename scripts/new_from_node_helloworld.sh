#!/usr/bin/env bash

set -x
rm -rf * .*

TEST=`echo $PWD|rev |cut -d'/' -f1 |rev`
git branch -D test/$TEST
git checkout -b test/$TEST

set -ex

rsync -avz --exclude 'node_modules' --exclude 'public' ../travis-node-helloworld/ .

sed "s/travis-node-helloworld/$TEST/g" .travis.yml > .new_travis.yml
mv .new_travis.yml .travis.yml

./build.sh

git add .
git commit -m"feat: init commit from travis-node-helloworld,"