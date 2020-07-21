#!/usr/bin/env bash

set -e

rm -rf test_git_repo
mkdir -p test_git_repo

cd test_git_repo
  git init
  echo 1 > test.txt

  git checkout -b master

  git add test.txt
  git commit -m"init commit for test.txt"

  git checkout -b test/test_1
  git checkout -b test/test_2
  git checkout -b test/test_3
  git checkout -b test/test_4
  git checkout -b test/test_5
  git checkout -b dependabot/npm_and_yarn/preact-graphviz-tryout/lodash
  git checkout -b develop
  git checkout -b pre-merge-master

  # currently on test_2, change copy in test2
  git checkout develop
  echo d > test.txt
  git commit . -m"change d in develop,"

  # currently on test_2, change copy in test2
  git checkout test/test_2
  echo 2 > test.txt
  git commit . -m"change 2 in test/test_2,"

  git checkout test/test_3
  echo 3 > test.txt
  git commit . -m"change 3 in test/test_3,"

  git checkout test/test_4
  echo 4 > test.txt
  git commit . -m"change 4 in test/test_4,"

  git checkout test/test_5
  echo 5 > test.txt
  git commit . -m"change 5 in test/test_5,"

  git checkout pre-merge-master
  git merge --ff-only test/test_2
  git checkout test/test_2
  # master already contain 2
  # merging develop into master introduce error

  # git merge develop
