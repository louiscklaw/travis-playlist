#!/usr/bin/env python3

import os,sys
import unittest

from pprint import pprint
from fabric.api import local, shell_env, lcd, run, settings
from chalk import red, green, yellow

PWD = os.getcwd()
sys.path.append(PWD)
sys.path.append(os.path.join(PWD,'_util'))

from _util.merge import *

class TestMerger(unittest.TestCase):
  def test_checkout_non_exist_branch(self):
    # merge_to_branch('111111','abcdefg')
    self.assertRaises(MyException.branch_not_found_except, merge_to_branch('111111','abcdefg'))

  def test_helloworld(self):
    self.assertTrue(helloworld()=='helloworld test', 'helloworld self test failed')

if __name__ == '__main__':
    unittest.main()
