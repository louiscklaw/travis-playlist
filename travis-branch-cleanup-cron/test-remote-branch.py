#!/usr/bin/env python

from clean_remote_branch import *

def test_sendCommand():
  fail_reason = 'test_sendCommand test failed'
  assert len(sendCommand("hostname")) > 0, fail_reason
  return False

def test_compareTimeStampFromNow():
  fail_reason = 'test_compareTimeStampFromNow test failed'
  assert compareTimeStampFromNow(10, 1) == 9, fail_reason
  return False

def test_filterOutBranch():
  fail_reason = 'filter out branch failed'
  assert False == filterOutBranch('not_wanted','not_wanted'),fail_reason
  assert True == filterOutBranch('wanted','not_wanted'), fail_reason

  print('test_filterOutBranch ok')

  return False

def test_filterOutDevelopBranch():
  fail_reason = 'filterOutDevelopBranch'
  assert False==filterOutDevelopBranch('/develop'), fail_reason
  return False

def test_filterOutGithubPagesBranch():
  fail_reason = 'filterOutGithubPagesBranch'
  assert False==filterOutGithubPagesBranch('gh-pages'), fail_reason
  return False

def test_filterOutHeadBranch():
  fail_reason = 'filterOutHeadBranch'
  assert False==filterOutHeadBranch('HEAD'), fail_reason
  return False

def test_filterOutMasterBranch():
  fail_reason = 'filterOutMasterBranch'
  assert False==filterOutMasterBranch('/master'), fail_reason
  return False

def test_filterOutTestBranch():
  fail_reason = 'filterOutTestBranch'
  assert False==filterOutTestBranch('test'), fail_reason
  return False

def test_filterPreMergeBranch():
  fail_reason = 'filterPreMergeBranch'
  test_result = list(filterPreMergeBranch(['pre-merge/1','pre-merge/2','test']))
  assert ['pre-merge/1','pre-merge/2']==test_result, fail_reason
  return False


def test_getDayDifference():
  fail_reason = 'getDayDifference'
  test_result = getDayDifference(86400)
  assert 1==test_result, fail_reason
  return False

def test_getUnixTimeStampNow():
  fail_reason = 'test_getUnixTimeStampNow'
  assert getUnixTimeStampNow() > 1593672959, fail_reason
  return False

def test_performDeleteBranch():
  return False

def test_shouldDeleteBranch():
  fail_reason = 'test_shouldDeleteBranch'
  assert False==shouldDeleteBranch(1, 'master'), fail_reason
  assert False==shouldDeleteBranch(90, 'master'), fail_reason
  assert False==shouldDeleteBranch(91, 'master'), fail_reason

  assert False==shouldDeleteBranch(1, 'develop'), fail_reason
  assert False==shouldDeleteBranch(90, 'develop'), fail_reason
  assert False==shouldDeleteBranch(91, 'develop'), fail_reason

  assert False==shouldDeleteBranch(1, 'pre-merge/test'), fail_reason
  assert False==shouldDeleteBranch(90, 'pre-merge/test'), fail_reason
  assert True==shouldDeleteBranch(91, 'pre-merge/test'), fail_reason
  return False


if __name__ == "__main__":
  helloworld()

  test_sendCommand()
  test_filterOutBranch()
  # test_compareTimeStampFromNow()
  test_getUnixTimeStampNow()
  test_filterOutDevelopBranch()
  test_filterOutGithubPagesBranch()
  test_filterOutHeadBranch()
  test_filterOutMasterBranch()
  test_filterPreMergeBranch()
  test_getDayDifference()
  test_shouldDeleteBranch()