#!/usr/bin/env python3

import os,sys
from fabric.api import local,lcd,run, settings
from pprint import pprint

expected_result = "['travis-check-leak/leak.js']"

with settings(warn_only=True):
  result = local('python3 travis-check-leak/check-leak.py',capture=True)
  assert(result.find(expected_result) > -1)

  print('check-leak script test done')
  print()