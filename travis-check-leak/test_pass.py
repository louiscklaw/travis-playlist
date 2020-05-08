#!/usr/bin/env python3

import os,sys
from fabric.api import local,lcd,run, settings
from pprint import pprint

expected_result = "['leak.js']"

with settings(warn_only=True):
  result = local('python3 check-leak.py',capture=True)
  print(result)

  assert(result.find(expected_result) == -1)

  print('test_pass.py done')