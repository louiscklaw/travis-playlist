#!/usr/bin/env python

import os, re, subprocess

SLACK_TOKEN = 'test'

BRANCH_TO_MERGE_INTO='develop'
TRAVIS_BRANCH = 'feature/test_branch'
TRAVIS_COMMIT = 'feature/test_b1'
GITHUB_REPO = 'github repo'
GITHUB_SECRET_TOKEN = 'secret_token'

PUSH_URI=f"https://{GITHUB_SECRET_TOKEN}@github.com/{GITHUB_REPO}"

print(f"SLACK_TOKEN->{SLACK_TOKEN}")

def run_command(command_body):
  return subprocess.check_output(command_body, shell=True).decode('utf-8')

m = re.match('feature/', TRAVIS_BRANCH)
if (m == None ) :
  pass

else:
  with(shell_env(
    GIT_COMMITTER_EMAIL='travis@travis',
    GIT_COMMITTER_NAME='Travis CI'
    )):

    print(f'checkout {BRANCH_TO_MERGE_INTO} branch')
    result = run_command(f'git checkout {BRANCH_TO_MERGE_INTO}')

    # print(f'Merging "{TRAVIS_COMMIT}"')
    # local(f'git merge --ff-only "{TRAVIS_COMMIT}"')

    # print(f'push commit')
    # local(f"git push {PUSH_URI} {BRANCH_TO_MERGE_INTO}")
