#!/usr/bin/env python3

import os,sys
from pprint import pprint

from fabric.api import local, lcd, run, settings

TMPDIR=local('mktemp -d',capture=True)

GH_PAGES_DIR=os.path.join(TMPDIR,'gh-pages')

# with settings(warn_only=True):
  # local('git worktree prune')
  # local('git worktree remove gh-pages')

with lcd('build-dashboard'):

  local('git submodule update --init --recursive themes/minimal')

  local('git worktree prune')

  local('mkdir -p {}'.format(GH_PAGES_DIR))

  # directory should exist
  local('ls -l {}'.format(GH_PAGES_DIR))
  # local('git clone git@github.com:louiscklaw/travis-playlist.git {}'.format(GH_PAGES_DIR))

  # with lcd(GH_PAGES_DIR):
  #   local('git checkout --orphan gh-pages')


  local('git worktree add {} gh-pages'.format(GH_PAGES_DIR))

  local('cp overlay/themes/minimal/layouts/index.html themes/minimal/layouts/index.html')

  local('hugo --minify --enableGitInfo --ignoreCache -d {}'.format(GH_PAGES_DIR))

  with lcd(GH_PAGES_DIR), settings(warn_only=True):
    local('git add .')
    commit_result = local('git commit -m "publish from travis-playlist/scripts/publish.sh"', capture=True)
    if commit_result.find("nothing to commit, working tree clean") > 0:
      print("branch is up to day, skipping...")
      print(commit_result)
    else:
      local('git push')


  local('git worktree list')

  local('git worktree remove {}'.format(GH_PAGES_DIR))

  local('git worktree list')

  local('rm -rf {}'.format(GH_PAGES_DIR))
  local('git branch -D gh-pages')

#done
