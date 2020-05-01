#!/usr/bin/env bash

set -ex

TMPDIR=$(mktemp -d)

cd build-dashboard
  git submodule update --init --recursive themes/minimal

  git worktree prune

  mkdir -p ../../gh-pages
  git worktree add ../../gh-pages gh-pages

  hugo --minify --enableGitInfo --ignoreCache -d ../../gh-pages

    cd ../../gh-pages
      git add .
      git commit -m "publish from publish.sh"
      git push
    cd -

#     rm -rf /tmp/gh-pages

  rm -rf ../../gh-pages
# rm -rf $TMPDIR

#done