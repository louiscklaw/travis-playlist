#!/usr/bin/env bash

set -x

# design notes:
# --------------------------------------
# 2 running condition
# 1: running locally for development
# 2: running on travis master branch
# those environment outside these 2 are not considered

# TMPDIR=$(mktemp -d)
TMPDIR='/tmp'
GH_PAGES_DIR=$TMPDIR/gh-pages

pipenv run python3 ./scripts/gen_repo_table.py

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

      if [[ -z $CI ]]; then
        echo ""
        echo -e "\e[33mWARNING: skipping push due to CI not set\e[0m"
      else
        git push
      fi
    cd -

cd ..

git worktree list

git worktree remove $GH_PAGES_DIR

git worktree list

rm -rf $GH_PAGES_DIR

#done
