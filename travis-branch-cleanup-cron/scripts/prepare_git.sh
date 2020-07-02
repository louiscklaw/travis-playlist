#!/usr/bin/env bash

set -x

rm -rf test_git_dir

mkdir -p test_git_dir

git clone git@github.com:louiscklaw/test_git_dir.git

cd test_git_dir

  echo 1 > 1.txt
  git add .
  git commit -m"init commit,"

  git checkout -b develop
  git checkout -b test/repo_1
  git checkout -b pre-merge/repo_1
  git checkout -b feature/repo_1

  git checkout master

  git push --all

cd ..