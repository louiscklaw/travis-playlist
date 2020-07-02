#!/usr/bin/env python

import sys
import os, re, subprocess
import time

import slack
from fabric.api import local, shell_env, lcd, run, settings

DELETE_DAY_THRESHOLD = float(os.getenv('DELETE_DAY_THRESHOLD', 90))
DRY_RUN = int(os.getenv('DRY_RUN',0))
GITHUB_TOKEN = os.environ['GITHUB_TOKEN']

def sendCommand(command_text):
  result = local(command_text, capture=True).split('\n')
  return list(map(lambda x: x.strip(), result))

def getGitAllBranches():
  return sendCommand('git branch -a', capture=True)

def filterOutBranch(branch_name, keyword):
  # return false when unwanted "keyword" found in branch input
  return branch_name.find(keyword) == -1

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

def filterOutUnwantedBranch(filterOutFunctions, branch):
  for filterOutFunction in filterOutFunctions:
    branch = filter(lambda x: filterOutFunction(x), branch)
  return branch

def getGitAllRemoteBranches():
  result = local('git branch -r', capture=True).split('\n')
  if len(result) < 1 :
    print('no remote branch found. ')
  result = map(lambda x: x.strip(), result)
  result = filter(lambda x: filterOutHeadBranch(x), result)
  result = filter(lambda x: filterOutMasterBranch(x), result)
  result = filter(lambda x: filterOutDevelopBranch(x), result)
  result = filter(lambda x: filterOutGithubPagesBranch(x), result)
  result = filter(lambda x: filterOutTestBranch(x), result)

  # filterOutUnwantedBranch([filterOutHeadBranch, filterOutMasterBranch, filterOutDevelopBranch, filterOutGithubPagesBranch, filterOutTestBranch] ,result)

  return sorted(list(result))

def getUnixTimeStampNow():
  return time.time()

# git show --format="%ci %cr" origin/feature/adding-travis-branch-cleanup-cron
def getLastCommittionDateOfBranch(branch):
  return sendCommand('git log --format="%ct" '+branch)

def compareTimeStampFromNow(branch_timestamp):
  return int(branch_timestamp[0]) - getUnixTimeStampNow()

def getDayDifference(diff_in_s):
  return diff_in_s / (60 * 60 * 24)

def filterPreMergeBranch(branches):
  return filter(lambda x: x.find('pre-merge/') > -1 ,branches)

def checkContaining(text_test, keyword_list):
  for keyword in keyword_list:
    if text_test.find(keyword) > -1:
      return True

  return False

def shouldDeleteBranch(diff_day, branch_name):
  if checkContaining(branch_name,['master','develop']):
    return False
  else:
    return abs(diff_day) > DELETE_DAY_THRESHOLD

def performDeleteBranch(branch):
  remote_branch_name = branch.replace('origin/','')
  command = 'git push -d origin {}'.format(remote_branch_name)

  if DRY_RUN == 1:
    print('delete skipped as DRY_RUN is set')
    print('command to run {}'.format(command))
  else:
    return local(command,capture=True)

def cloneRemoteBranch(repo_url):
  with lcd('/tmp'):
    sendCommand('git clone {}'.format(repo_url))


def helloworld():
  print('helloworld')
  return 'helloworld'

def checkAndCleanBranch():
  for branch_to_test in getGitAllRemoteBranches():
    diff_s = compareTimeStampFromNow(getLastCommittionDateOfBranch(branch_to_test))
    diff_day = getDayDifference(diff_s)
    print('checking branch {}'.format(branch_to_test))
    # print('day diff {}'.format(diff_day))

    if shouldDeleteBranch(diff_day, branch_to_test):
      performDeleteBranch(branch_to_test)
    else:
      print('not deleting as criteria not meet')

if __name__ == "__main__":
  repo_full_name = sys.argv[1]
  repo_uri = "https://{}@github.com/{}".format(GITHUB_TOKEN, repo_full_name)

  repo_name = repo_full_name.split('/')[-1].replace('.git','')
  working_directory = '/tmp/'+repo_name

  print('repo_name {}'.format(repo_name))
  print('working_directory {}'.format(working_directory))

  print('cloning directory')
  cloneRemoteBranch(repo_uri)

  with lcd(working_directory):
    print('working directory {}'.format(working_directory))
    checkAndCleanBranch()