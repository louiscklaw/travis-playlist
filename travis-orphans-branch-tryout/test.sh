#!/usr/bin/env bash

# https://github.blog/2012-09-21-easier-builds-and-deployments-using-git-over-https-and-oauth/

set -ex

TMP_DIR=$(mktemp -d)

cd $TMP_DIR

  git clone --depth=1 https://$GITHUB_TOKEN@github.com/louiscklaw/travis-playlist.git .

  git checkout --orphan test-orphan

  rm .git/index

  git clean -fdx

  echo 1 > helloworld

  git add helloworld
  git commit -m"testing orphan branch,"

  git push -u origin test-orphan

cd -
