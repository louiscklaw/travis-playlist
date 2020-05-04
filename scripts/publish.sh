#!/usr/bin/env bash

set -ex

# design notes:
# --------------------------------------
# 2 running condition
# 1: running locally for development
# 2: running on travis master branch
# those environment outside these 2 are not considered

wget https://github.com/gohugoio/hugo/releases/download/v0.69.2/hugo_extended_0.69.2_Linux-64bit.deb

sudo dpkg -i hugo_extended_0.69.2_Linux-64bit.deb

rm -rf hugo_extended_0.69.2_Linux-64bit.deb

# TMPDIR=$(mktemp -d)
TMPDIR='/tmp'
GH_PAGES_DIR=$TMPDIR/gh-pages

pipenv sync

pipenv run python3 ./scripts/gen_repo_table.py

cd build-dashboard
  git submodule update --init --recursive themes/minimal

  hugo --minify --enableGitInfo --ignoreCache -d /tmp/gh-pages-out

cd ..

# git worktree list

# git worktree remove $GH_PAGES_DIR

# git worktree list

# rm -rf $GH_PAGES_DIR

#done
