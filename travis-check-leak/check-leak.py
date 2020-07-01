#!/usr/bin/env python3

from multiprocessing import Pool
from functools import reduce
from pprint import pprint
from subprocess import check_output

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

try:
  [os.environ[t] for t in environ_var_list]
except Exception as e:
  print(chalk.red("cannot get the wanted environment variables"))
  sys.exit(99)

excepted_file_list = ['check-leak.py']

check_commands = list(
  sorted(
    [['grep','-ril',temp, '.'] for temp in word_list]+
    [['grep','-ril','$'+temp,'.'] for temp in environ_var_list]
  )
)

def find_file_in_exception(in_file):
  return any(list(map(lambda x: in_file.find(x) == -1, excepted_file_list)))

def get_env_var(var_name):
  return '"' + os.environ[var_name[1:]] + '"'

def f(check_command):
  check_result=''
  command_list = check_command
  if (command_list[2][0] =='$'):
    command_list[2]=get_env_var(command_list[2])

  try:
    # print(' '.join(command_list))
    check_result = check_output(command_list, cwd="/home/logic/_workspace/travis-playlist/travis-check-leak")
    pass
  except Exception as e:
    pass

  if type(check_result) == type('a'):
    return check_result.split('\n')
  else:
    return check_result.decode('ascii').split('\n')

print('start')

# check_commands= ['grep -ril "careless_token" .']
# print(check_commands)

p = Pool(10)
scan_result = []
scan_result = p.map(f, check_commands)
# for i in check_commands:
#   scan_result.append(f(i))

p.close()
p.join()

flattened_file_list = list(set(reduce(lambda a,b: a+b, scan_result)))

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
