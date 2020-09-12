#!/usr/bin/env python
# coding:utf-8

import os
import sys
import logging
import traceback
from pprint import pprint
import shlex
from subprocess import run, PIPE, Popen

from multiprocessing.pool import ThreadPool

from tqdm import tqdm, trange

# input
def fullfillInputRequirement():
  if len(sys.argv) < 2:
    print('')
    print('error')
    print('')
    print('cannot fullfill input requirement')
    print('expected usage: ')
    print('pipenv run python3 main.py <SCAN_DIR>')
    print()
    sys.exit(99)


def checkPythonVersion():
  import platform
  return platform.python_version()

def checkPythonVersionFullfill( version_threshold):
  from packaging import version
  return version.parse(checkPythonVersion()) >= version.parse(version_threshold)

CWD = os.getcwd()
SCAN_DIR = CWD if len(sys.argv) < 2 else sys.argv[1]

SKIP_LIST=[
  'logickee','1','http'
]

print('SCAN_DIR:"{}"'.format(SCAN_DIR))

def checkLeak(should_not_appear, filepath_to_check):
  # true = leakage found, false = leakage not found

  command_string = 'grep -ri --exclude-dir=node_modules "{}" {}'.format(should_not_appear, filepath_to_check)
  command = shlex.split(command_string)
  # print(' '.join(command))

  if (checkPythonVersionFullfill('3.7')):
    result = run(command, capture_output=True)
  else:
    # e.g. 3.6 for ubuntu 18.04
    result = run(command, stdout=PIPE)

  if result.returncode == 0:
    # print(result.stdout)
    # print('{}:{}, {}, {}'.format(word, result.returncode, result.stdout, result.args))
    return (True, should_not_appear)
  else:
    return (False,result.returncode)
    # raise 'leakage found'

def paralllel_check_leak(c): return checkLeak(*c)

def readCredentialFile(filepath):
  file_content = open(filepath,'r').readlines()
  file_content = filter(lambda x: x.strip(), file_content)
  file_content = filter(lambda x: x[0] != '#', file_content)

  return set(file_content)

def parseCredentialFile():
  try:
    HOME=os.environ['HOME']
    filepath=HOME+'/.credentials.rc'
    if os.path.exists(filepath):

      content = readCredentialFile(filepath)
      content = map(lambda x: x.strip(), content)
      return map(lambda x: x.replace('export ',''), content)
    else:
      print('filepath wanted: {}'.format(filepath))
      raise 'filepath not found'
  except Exception as e:
    raise e

def clearBashValue(txt_value_in):
  output = txt_value_in

  if output[0]=="'":
    output = output[1:]

  if output[-1]=="'":
    output = output [:-1]

  if output[0]=='"':
    output = output[1:]

  if output[-1]=='"':
    output = output [:-1]

  return output


def credentialValue():
  temp1 = parseCredentialFile()
  temp2 = map(lambda x: x.split('=')[1:][0], temp1)
  temp3 = map(lambda x: clearBashValue(x), temp2)
  return temp3

def printBanner(text, text1):
  print('\n'*1)
  print('V'*76)
  print()
  print(' '* 16, text)
  print(' '* 16, text1)
  print()
  print('^'*76)
  print('\n'*1)

def foo(word, number):
    print (word * number)
    return number

def main():
  should_not_appear = list(credentialValue())

  printBanner('scanning for sensitive words', SCAN_DIR)
  print('scan start')

  should_not_appear_after_skip_list = filter(lambda x: x not in SKIP_LIST, should_not_appear)

  pool = ThreadPool(5)

  results = []
  # should_not_appear_after_skip_list
  for word in tqdm(should_not_appear_after_skip_list):
      results.append(pool.apply_async(checkLeak, args=(word, SCAN_DIR)))

  pool.close()
  pool.join()

  pprint(results)


  results = [r.get() for r in results]
  (tf_result, word_found) = zip(*results)

  if any(tf_result):
    pprint(list(filter(lambda x: x[0]==True, results)))
    raise "leak found"
    sys.exit(999)

  else:
    print('scan done, thanks')
    sys.exit(0)

if __name__ == '__main__':
  fullfillInputRequirement()
  main()
