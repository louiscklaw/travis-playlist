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

def test_create_temp_dir():
  TEMP_DIR = create_temp_dir()

def test_get_branch_name():
  assert 'branch_name' == get_branch_name('fix/branch_name')
  assert 'branch_name' == get_branch_name('feature/branch_name')
  assert 'branch_name' == get_branch_name('pre-merge/branch_name')
  assert 'branch_name' == get_branch_name('test/branch_name')
  assert 'develop' == get_branch_name('develop')
  assert 'master' == get_branch_name('master')

def test_process_test_branch():
  process_test_branch('test/new_feature_name')

def test_process_feature_branch():
  process_feature_branch('feature/new_feature_name')

def test_process_pre_merge_branch():
  process_pre_merge_branch('pre-merge/new_feature_name')

test_fix_branch()
test_feature_branch()
test_test_branch()

test_process_test_branch()
test_process_feature_branch()
test_process_pre_merge_branch()

test_get_branch_name()
test_create_temp_dir()