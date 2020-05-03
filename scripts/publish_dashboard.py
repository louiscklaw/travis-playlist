#!/usr/bin/env python3

import os,sys
from pprint import pprint

from fabric.api import local, lcd, run, settings

TMPDIR=local('mktemp -d',capture=True)

GH_PAGES_DIR=os.path.join(TMPDIR,'gh-pages')

with lcd('build-dashboard'):

  local('git submodule update --init --recursive themes/minimal')

  local('git worktree prune')

  local('mkdir -p {}'.format(GH_PAGES_DIR))

  # directory should exist
  local('ls -l {}'.format(GH_PAGES_DIR))

  local('git worktree add {} gh-pages'.format(GH_PAGES_DIR))

  local('cp build-dashboard/overlay/themes/minimal/layouts/index.html build-dashboard/themes/minimal/layouts/index.html')

  local('hugo --minify --enableGitInfo --ignoreCache -d {}'.format(GH_PAGES_DIR))

  with lcd(GH_PAGES_DIR), settings(warn_only=True):
    local('git add .')
    if local('git commit -m "publish from publish.sh"', capture=True).find("nothing to commit, working tree clean") > 0:
      print("branch is up to day, skipping...")
    else:
      local('git push')


  local('git worktree list')

  local('git worktree remove {}'.format(GH_PAGES_DIR))

  local('git worktree list')

  local('rm -rf {}'.format(GH_PAGES_DIR))

#done
