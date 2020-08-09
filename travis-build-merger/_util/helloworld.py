#!/usr/bin/env python

# reference build https://travis-ci.org/louiscklaw/test_git_repo/builds/625335510
# https://docs.travis-ci.com/user/environment-variables/

import sys
import os, re, subprocess
import chalk

from fabric.api import local, shell_env, lcd, run, settings

def checkBranchExist(branch_wanted, cwd):
  with lcd(cwd):
    branches = local('git branch -a')
    return branch_wanted in branches