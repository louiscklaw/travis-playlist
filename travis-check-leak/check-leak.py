#!/usr/bin/env python3

import os,sys
from fabric.api import local,lcd,run
from multiprocessing import Pool
from functools import reduce

word_list=[
  'careless_token',
  'token xoxb',
  'xoxb'
]

excepted_file_list = ['check-leak.py']

check_commands = ['grep -ril "{}" *'.format(word) for word in word_list]

def find_file_in_exception(in_file):
  return any(list(map(lambda x: in_file.find(x) == -1, excepted_file_list)))

def f(check_command):
    return local(check_command,capture=True).split('\n')

if __name__ == '__main__':
    p = Pool(10)
    scan_result = p.map(f, check_commands)
    p.close()
    p.join()

    flattened_file_list = list(set(reduce(lambda a,b: a+b, scan_result)))

    file_after_exception = list(filter(find_file_in_exception  ,flattened_file_list))

    if len(file_after_exception) > 0:
      print('')
      print('LEAKING FOUND')
      print('-'*80)
      print(file_after_exception)

      exit(99)
