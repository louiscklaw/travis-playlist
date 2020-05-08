#!/usr/bin/env python3
from fabric.api import local, lcd, run, settings
from multiprocessing import Pool
from functools import reduce
from pprint import pprint

import os,sys
import chalk

from subprocess import check_output

word_list=['careless_token', 'token xoxb', 'xoxb']
environ_var_list=[
  'TRAVIS_TOKEN',
  'SLACK_TOKEN',
  'GITHUB_TOKEN',
  'TRAVIS_AUTH_TOKEN',
  'SLACK_NOTIFICATIONS'
]

excepted_file_list = ['check-leak.py']

check_commands = ['grep -ril "{}" * 2>&1'.format(temp) for temp in word_list]+['grep -ril ${} * 2>&1'.format(temp) for temp in environ_var_list]

def find_file_in_exception(in_file):
  return any(list(map(lambda x: in_file.find(x) == -1, excepted_file_list)))

def f(check_command):
  with settings(warn_only=True):
    result =local(check_command,capture=True).split('\n')
    return result

print('start')

p = Pool(10)
scan_result = p.map(f, check_commands)
p.close()
p.join()

flattened_file_list = list(set(reduce(lambda a,b: a+b,
scan_result)))

# remove empty result
flattened_file_list = list(set(filter(lambda x: x != '', flattened_file_list)))

file_after_exception = list(filter(find_file_in_exception  ,flattened_file_list))

if len(file_after_exception) != 1:
  print('')
  print('LEAKING FOUND')
  print('-'*80)
  print(file_after_exception)

  exit(99)

print
print('check-leak script test done')
print
