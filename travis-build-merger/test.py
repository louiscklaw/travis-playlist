#!/usr/
import os, re, subprocess

from fabric.api import local, shell_env, lcd, run, settings

os.environ['GITHUB_TOKEN'] = 'GITHUB_TOKEN_test'

from _util.merge import *

helloworld()

def test_fix_branch():
  assert categorize_branch('fix/') == CONST_BRANCH_FIX

def test_feature_branch():
  assert categorize_branch('feature/') == CONST_BRANCH_FEATURE

def test_test_branch():
  assert categorize_branch('test/') == CONST_BRANCH_TEST

def test_pre_merge_master_branch():
  assert categorize_branch('pre-merge-master') == CONST_BRANCH_PRE_MERGE_MASTER

def test_develop_branch():
  assert categorize_branch('develop') == CONST_BRANCH_DEVELOP

def test_create_temp_dir():
  TEMP_DIR = create_temp_dir()

def test_get_branch_name():
  assert 'branch_name' == get_branch_name('fix/branch_name')
  assert 'branch_name' == get_branch_name('feature/branch_name')
  assert 'branch_name' == get_branch_name('pre-merge/branch_name')
  assert 'branch_name' == get_branch_name('test/branch_name')
  assert 'develop' == get_branch_name('develop')
  assert 'master' == get_branch_name('master')

def test_merge_to_feature_branch():
  temp_dir = create_temp_dir()
  run_command('git init', temp_dir)
  run_command('touch test_dummy_file', temp_dir)
  run_command('git add . && git commit . -m "test_commit,"', temp_dir)
  run_command('git checkout -b test/test1', temp_dir)

  merge_to_feature_branch('test/test1', 'feature/test1', temp_dir)

  run_command('git branch', temp_dir)

def test_merge_to_pre_merge_branch():
  temp_dir = create_temp_dir()
  run_command('git init', temp_dir)
  run_command('touch test_dummy_file', temp_dir)
  run_command('git add . && git commit . -m "test_commit,"', temp_dir)
  run_command('git checkout -b fix/test1', temp_dir)

  merge_to_pre_merge_branch('fix/test1', 'pre-merge/test1', temp_dir)

  run_command('git branch', temp_dir)
  assert check_branch_exist('pre-merge/test1', temp_dir)


def test_merge_to_develop_branch():
  temp_dir = create_temp_dir()
  run_command('git init', temp_dir)
  run_command('touch test_dummy_file', temp_dir)
  run_command('git add . && git commit . -m "test_commit,"', temp_dir)
  run_command('git checkout -b develop', temp_dir)
  run_command('git checkout -b fix/test1', temp_dir)

  merge_to_develop_branch('fix/test1', temp_dir)

  run_command('git branch', temp_dir)
  assert check_branch_exist('develop', temp_dir)


def test_merge_to_pre_merge_master_branch():
  temp_dir = create_temp_dir()
  run_command('git init', temp_dir)
  run_command('touch test_dummy_file', temp_dir)
  run_command('git add . && git commit . -m "test_commit,"', temp_dir)
  run_command('git checkout master', temp_dir)
  run_command('git checkout -b develop', temp_dir)
  run_command('git checkout -b pre-merge-master', temp_dir)

  merge_to_pre_merge_master_branch('develop', temp_dir)

  run_command('git branch', temp_dir)
  assert check_branch_exist('pre-merge-master', temp_dir)


def test_merge_to_master_branch():
  temp_dir = create_temp_dir()
  run_command('git init', temp_dir)
  run_command('touch test_dummy_file', temp_dir)
  run_command('git add . && git commit . -m "test_commit,"', temp_dir)
  run_command('git checkout master', temp_dir)
  run_command('git checkout -b pre-merge-master', temp_dir)

  merge_to_master_branch('pre-merge-master', temp_dir)

  run_command('git branch', temp_dir)
  assert check_branch_exist('pre-merge-master', temp_dir)



def test_process_feature_branch():
  process_feature_branch('feature/new_feature_name')

def test_process_pre_merge_branch():
  process_pre_merge_branch('pre-merge/new_feature_name')


test_fix_branch()
test_feature_branch()
test_test_branch()
test_develop_branch()
test_pre_merge_master_branch()

# test to feature
test_merge_to_feature_branch()

# feature to pre_merge
test_merge_to_pre_merge_branch()

# pre-merge to develop
test_merge_to_develop_branch()
test_merge_to_pre_merge_master_branch()
test_merge_to_master_branch()

test_get_branch_name()
test_create_temp_dir()

# test_process_test_branch()
# # test_process_feature_branch()
# test_process_pre_merge_branch()
