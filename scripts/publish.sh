#!/usr/bin/env bash

set -ex

TMPDIR=$(mktemp -d)
GH_PAGES_DIR=$TMPDIR/gh-pages

cd build-dashboard
  git submodule update --init --recursive themes/minimal

  git worktree prune

  mkdir -p $GH_PAGES_DIR

  # directory should exist
  ls -l $GH_PAGES_DIR

  git worktree add $GH_PAGES_DIR gh-pages

  hugo --minify --enableGitInfo --ignoreCache -d $GH_PAGES_DIR

    cd $GH_PAGES_DIR
      git add .
      git commit -m "publish from publish.sh"
      git push
    cd -


cd ..

git worktree list

git worktree remove $GH_PAGES_DIR

git worktree list

rm -rf $GH_PAGES_DIR
# rm -rf $TMPDIR

#done