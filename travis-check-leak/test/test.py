#!/usr/bin/env python3

import os, sys
from pprint import pprint
from tempfile import mkdtemp
from subprocess import run, PIPE, Popen

import unittest

CWD=os.path.dirname(__file__)
PROJ_HOME=os.path.abspath(os.path.join(CWD,'..'))

sys.path.append(PROJ_HOME)

from main import *

class TestStringMethods(unittest.TestCase):

  def test_leak_not_found(self):
    checkLeak('bbb',os.path.abspath(os.getcwd())+'/leak_doc.txt')

  def test_leak_found(self):
    # with self.assertRaises(TypeError):
    result=checkLeak('aaa',os.path.abspath(os.getcwd())+'/leak_doc.txt')
    self.assertEqual((True,'aaa'),result,'error with leak found')

  def test_callingWithoutPath(self):
    result = run(shlex.split('python3 main.py'))
    self.assertEqual(result.returncode,99, 'should return error 99 when calling without input path')

  def test_callingWithPath_NoWordFound(self):
    command = 'python3 main.py {}'.format(mkdtemp())
    pprint(command)
    result = run(shlex.split(command))
    self.assertEqual(result.returncode,0, 'should return 0 when no sensitive word found')

if __name__ == '__main__':
  unittest.main()
