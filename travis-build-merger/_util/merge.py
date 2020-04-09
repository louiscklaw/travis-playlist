#!/usr/bin/env python

# reference build https://travis-ci.org/louiscklaw/test_git_repo/builds/625335510
# https://docs.travis-ci.com/user/environment-variables/

import sys
import os, re, subprocess
import slack

from fabric.api import local, shell_env, lcd, run, settings

SLACK_TOKEN = os.environ['SLACK_TOKEN']

CONST_BRANCH_UNKNOWN = -1
CONST_BRANCH_FIX = 0
CONST_BRANCH_FEATURE = 1
CONST_BRANCH_TEST = 2
CONST_BRANCH_PRE_MERGE = 3
CONST_BRANCH_DEVELOP = 4
CONST_BRANCH_PRE_MERGE_MASTER = 5

merge_direction = {
  '^test/(.+?)$': 'feature',
  '^feature/(.+?)$' : 'develop',
  '^fix/(.+?)$' : 'pre-merge',
  '^pre-merge/(.+?)$' : 'develop',
  # 'develop': 'master'
}

TRAVIS_BRANCH = os.environ['TRAVIS_BRANCH']
TRAVIS_COMMIT = os.environ['TRAVIS_COMMIT']
TRAVIS_BUILD_NUMBER = os.environ['TRAVIS_BUILD_NUMBER']
GITHUB_REPO = os.environ['TRAVIS_REPO_SLUG']
GITHUB_TOKEN = os.environ['GITHUB_TOKEN']

PUSH_URI="https://{}@github.com/{}".format(GITHUB_TOKEN, GITHUB_REPO)

def create_temp_dir():
  TEMP_DIR = local('mktemp -d', capture=True)
  print(f'create temp directory: {TEMP_DIR}')
  return TEMP_DIR

def git_clone_source(PUSH_URI, TEMP_DIR):
  local('git clone "{}" "{}"'.format(PUSH_URI, TEMP_DIR))

def slack_message(message, channel):
  client = slack.WebClient(token=SLACK_TOKEN)
  response = client.chat_postMessage(
      channel=channel,
      text=message,
      username='TravisMergerBot',
      icon_url=':sob:'
      )

def run_command(command_body, cwd):
  command_result = local('cd {} && {}'.format(cwd, command_body), capture=True)
  print(command_result)
  return command_result

def push_commit(uri_to_push, merge_to, cwd):
    print('push commit')
    run_command("git push {} {}".format(uri_to_push, merge_to), cwd)

def merge_to_branch(commit_id, merge_to):
  with( shell_env( GIT_COMMITTER_EMAIL='travis@travis', GIT_COMMITTER_NAME='Travis CI' ) ):
    print('checkout {} branch'.format(merge_to))
    run_command('git checkout {}'.format(merge_to))

    print('Merging "{}"'.format(commit_id))
    result_to_check = run_command('git merge --ff-only "{}"'.format(commit_id))

    if result_to_check.failed:
      slack_message('error found during merging BUILD{} `{}` from `{}` to `{}`'.format(TRAVIS_BUILD_NUMBER, GITHUB_REPO, TRAVIS_BRANCH, merge_to), '#travis-build-result')
    else:
      slack_message('merging BUILD{} from {} `{}` to `{}` done'.format(TRAVIS_BUILD_NUMBER, GITHUB_REPO, TRAVIS_BRANCH, merge_to), '#travis-build-result')

def create_new_branch(branch_name, cwd):
  with( shell_env( GIT_COMMITTER_EMAIL='travis@travis', GIT_COMMITTER_NAME='Travis CI' ) ):
    print('checkout new branch: {}'.format(branch_name))
    run_command('git checkout -b {}'.format(branch_name), cwd)

def checkout_branch(branch_name, cwd):
  with( shell_env( GIT_COMMITTER_EMAIL='travis@travis', GIT_COMMITTER_NAME='Travis CI' ) ):
    print('checkout branch: {}'.format(branch_name))
    run_command('git checkout {}'.format(branch_name), cwd)

def create_branch_if_not_exist(branch_name, cwd):
  'checkout branch if exist, create and checkout if not exist'
  if check_branch_exist(branch_name, cwd):
    checkout_branch(branch_name, cwd)
  else:
    create_new_branch(branch_name, cwd)

def check_branch_exist(branch_name, cwd):
  with( shell_env( GIT_COMMITTER_EMAIL='travis@travis', GIT_COMMITTER_NAME='Travis CI' ) ):
    print('check branch exist: {}'.format(branch_name))
    result = [temp.replace('* ','').strip() for temp in run_command('git branch', cwd).split('\n')]
    try:
      from pprint import pprint
      pprint(result)
      result.index(branch_name)
      print('branch found')
      return True
    except Exception as e:
      print('branch not found')
      return False
      pass

def helloworld():
  print('helloworld')

def get_branch_name(branch_in):
  temp = branch_in.split('/')
  if len(temp) > 1:
    return '/'.join(temp[1:])
  else:
    return branch_in

def categorize_branch(branch_to_test):

  if branch_to_test[0:4] == 'fix/':
    return CONST_BRANCH_FIX
  elif branch_to_test == 'develop':
    return CONST_BRANCH_DEVELOP
  elif branch_to_test == 'pre-merge-master':
    return CONST_BRANCH_PRE_MERGE_MASTER
  elif branch_to_test[0:8] == 'feature/':
    return CONST_BRANCH_FEATURE
  elif branch_to_test[0:5] == 'test/':
    return CONST_BRANCH_TEST
  elif branch_to_test[0:10] == 'pre-merge/':
    return CONST_BRANCH_PRE_MERGE
  else:
    return CONST_BRANCH_UNKNOWN

def merge_to_feature_branch(test_branch_name, feature_branch_name, cwd):
  create_branch_if_not_exist(feature_branch_name, cwd)
  # currently in feature branch

  run_command('git merge --ff-only "{}"'.format(test_branch_name), cwd)

def merge_to_pre_merge_branch(fix_branch_name, pre_merge_branch_name, cwd):
  create_branch_if_not_exist(pre_merge_branch_name, cwd)
  # currently in feature branch

  run_command('git merge --ff-only "{}"'.format(fix_branch_name), cwd)

def merge_to_develop_branch(branch_to_merge, cwd):
  checkout_branch('develop', cwd)
  run_command('git merge --ff-only "{}"'.format(branch_to_merge), cwd)


def merge_to_pre_merge_master_branch(branch_to_merge, cwd):
  create_branch_if_not_exist('pre-merge-master', cwd)
  run_command('git merge --ff-only "{}"'.format(branch_to_merge), cwd)

def merge_to_master_branch(branch_to_merge, cwd):
  checkout_branch('master', cwd)
  run_command('git merge --ff-only "{}"'.format(branch_to_merge), cwd)


def process_test_branch(PUSH_URI, test_branch_name, cwd, no_push_uri = False):


  branch_name = get_branch_name(test_branch_name)
  feature_branch_name = 'feature/'+branch_name

  # CAUTION: using cwd inside run_command
  run_command('git clone  -b {} {} .'.format(test_branch_name, PUSH_URI), cwd)

  merge_to_feature_branch(test_branch_name, feature_branch_name, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    push_commit(PUSH_URI, feature_branch_name, cwd)

def process_feature_branch(PUSH_URI, feature_branch_in, cwd, no_push_uri = False):


  branch_name = get_branch_name(feature_branch_in)
  pre_merge_branch = 'pre-merge/'+branch_name

  # CAUTION: using cwd inside run_command
  run_command('git clone  -b {} {} .'.format(feature_branch_in, PUSH_URI), cwd)

  merge_to_pre_merge_branch(feature_branch_in, pre_merge_branch, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    push_commit(PUSH_URI, pre_merge_branch, cwd)

def process_fix_branch(PUSH_URI, fix_branch_in, cwd, no_push_uri = False):
  branch_name = get_branch_name(fix_branch_in)
  pre_merge_branch = 'pre-merge/'+branch_name

  # CAUTION: using cwd inside run_command
  run_command('git clone  -b {} {} .'.format(fix_branch_in, PUSH_URI), cwd)

  merge_to_pre_merge_branch(fix_branch_in, pre_merge_branch, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    push_commit(PUSH_URI, pre_merge_branch, cwd)


def process_pre_merge_branch(PUSH_URI, pre_merge_branch_in, cwd, no_push_uri = False):
  branch_name = get_branch_name(pre_merge_branch_in)
  run_command('git clone  -b {} {} .'.format(pre_merge_branch_in, PUSH_URI), cwd)
  merge_to_develop_branch(pre_merge_branch_in, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    push_commit(PUSH_URI, 'develop', cwd)


def process_develop_branch(PUSH_URI, pre_merge_branch_in, cwd, no_push_uri = False):
  'checkout master branch, create pre-merge-master'
  'on pre-merge-master branch, merge develop and re-test'

  run_command('git clone {} .'.format(PUSH_URI), cwd)
  merge_to_pre_merge_master_branch(pre_merge_branch_in, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    push_commit(PUSH_URI, 'develop', cwd)


def process_pre_merge_master_branch(PUSH_URI, pre_merge_branch_in, cwd, no_push_uri = False):
  'checkout pre-merge-master branch'
  'on master branch, merge pre-merge-master and re-test'

  run_command('git clone  -b {} {} .'.format(pre_merge_branch_in, PUSH_URI), cwd)
  merge_to_master_branch(pre_merge_branch_in, cwd)

  if no_push_uri:
    print('no pushing commit as no_push_uri is true')
  else:
    push_commit(PUSH_URI, 'develop', cwd)


def main(PUSH_URI, TEMP_DIR):
  print('starting merger')
  print(f'current branch {TRAVIS_BRANCH}')

  if categorize_branch(TRAVIS_BRANCH) == CONST_BRANCH_TEST:
    # test branch will merge to feature branch
    print("this is test branch, will checkout to feature branch")
    process_test_branch(PUSH_URI, TRAVIS_BRANCH, TEMP_DIR)

  elif categorize_branch(TRAVIS_BRANCH) == CONST_BRANCH_FEATURE:
    # feature branch will merge to pre-merge branch
    print("this is feature branch, will checkout to pre-merge branch")
    process_feature_branch(PUSH_URI, TRAVIS_BRANCH, TEMP_DIR)

  elif categorize_branch(TRAVIS_BRANCH) == CONST_BRANCH_FIX:
    # fix branch will merge to pre-merge branch
    print("this is fix branch, will checkout to pre-merge branch")
    process_fix_branch(PUSH_URI, TRAVIS_BRANCH, TEMP_DIR)

  elif categorize_branch(TRAVIS_BRANCH) == CONST_BRANCH_PRE_MERGE:
    # pre-merge branch will merge to develop branch
    print("this is pre-merge branch, will merge to develop branch")
    process_pre_merge_branch(PUSH_URI, TRAVIS_BRANCH, TEMP_DIR)

  elif categorize_branch(TRAVIS_BRANCH) == CONST_BRANCH_DEVELOP:
    # develop branch will merge to pre-merge-master branch
    print("this is develop branch, will merge to master branch")
    process_develop_branch(PUSH_URI, TRAVIS_BRANCH, TEMP_DIR)

  elif categorize_branch(TRAVIS_BRANCH) == CONST_BRANCH_PRE_MERGE_MASTER:
    # pre-merge-master branch will merge to master branch
    print("this is pre-merge-master branch, will merge to master branch")
    process_pre_merge_master_branch(PUSH_URI, TRAVIS_BRANCH, TEMP_DIR)

  else:
    print('no merge direction for this branch')

if __name__ == "__main__":
  TEMP_DIR = create_temp_dir()
  main(PUSH_URI, TEMP_DIR)