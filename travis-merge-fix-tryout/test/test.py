#!/usr/bin/env python3

import os,sys
from pprint import pprint

CWD=os.path.dirname(__file__)
sys.path.append('{}/../src'.format(CWD))
from main import *

TMP_DIR=tempfile.mkdtemp()

def test_checkBranchExist_existing_branch():
  assert True==checkBranchExist(TMP_DIR, 'master'), 'check existing branch failed'

def test_checkBranchExist_non_existing_branch():
  assert False==checkBranchExist(TMP_DIR, 'blablabla'), 'check existing branch failed'

def test_gitClone():
  gitClone('louiscklaw/test_on_github',TMP_DIR)

def test_helloworld():
  helloworld()

def test_mergeBranch():
  test_gitClone()
  mergeBranch(TMP_DIR, 'develop','master')

def main():
  test_helloworld()
  test_gitClone()
  test_checkBranchExist_existing_branch()
  test_checkBranchExist_non_existing_branch()
  test_mergeBranch()

if __name__=="__main__":
  main()
