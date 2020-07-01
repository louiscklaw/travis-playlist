#!/usr/bin/env python

import sys
import os, re, subprocess
import time

import slack
from fabric.api import local, shell_env, lcd, run, settings

DELETE_DAY_THRESHOLD = 0.05

def getGitAllBranches():
  return local('git branch -a', capture=True).split('\n')

def filterOutBranch(branch, keyword):
  return branch.find(keyword) == -1

def filterOutHeadBranch(branch):
  return filterOutBranch(branch,'HEAD')

def filterOutMasterBranch(branch):
  return filterOutBranch(branch,'/master')

def filterOutDevelopBranch(branch):
  return filterOutBranch(branch, '/develop')

def filterOutGithubPagesBranch(branch):
  return filterOutBranch(branch, 'gh-pages')

def filterOutTestBranch(branch):
  return filterOutBranch(branch, 'test')

def getGitAllRemoteBranches():
  result = local('git branch -r', capture=True).split('\n')
  result = map(lambda x: x.strip(), result)
  result = filter(lambda x: filterOutHeadBranch(x), result)
  result = filter(lambda x: filterOutMasterBranch(x), result)
  result = filter(lambda x: filterOutDevelopBranch(x), result)
  result = filter(lambda x: filterOutGithubPagesBranch(x), result)
  result = filter(lambda x: filterOutTestBranch(x), result)

  return sorted(list(result))

def getUnixTimeStampNow():
  return time.time()

# git show --format="%ci %cr" origin/feature/adding-travis-branch-cleanup-cron
def getLastCommittionDateOfBranch(branch):
  return local('git show --format="%ct" '+branch, capture=True).strip()

def compareTimeStampFromNow(branch_timestamp):
  return int(branch_timestamp) - getUnixTimeStampNow()

def getDayDifference(diff_in_s):
  return diff_in_s / (60 * 60 * 24)

def filterPreMergeBranch(branches):
  return filter(lambda x: x.find('pre-merge/') > -1 ,branches)

def shouldDeleteBranch(diff_day):
  return abs(diff_day) > DELETE_DAY_THRESHOLD

def performDeleteBranch(branch):
  remote_branch_name = branch.replace('origin/','')
  return local('git push -d origin {}'.format(remote_branch_name),capture=True)

for branch_to_test in getGitAllRemoteBranches():
  diff_s = compareTimeStampFromNow(getLastCommittionDateOfBranch(branch_to_test))
  diff_day = getDayDifference(diff_s)
  print('checking branch '+branch_to_test)
  print('day diff {}'.format(diff_day))

  if shouldDeleteBranch(diff_day):
    print('delete day is larger than threshold, delete branch')
    performDeleteBranch(branch_to_test)