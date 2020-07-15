#!/usr/bin/env python3

import os,sys
from pprint import pprint
from fabric.api import local, shell_env, lcd, run, settings
from chalk import red, green, yellow

PWD = os.getcwd()

def run_command(command_body, cwd=PWD):
  command_result = local('cd {} && {}'.format(cwd, command_body), capture=True)
  print(command_result)
  return command_result

try:
  with settings(warn_only=True):
    test = run_command('exit 99')
    pprint(test.succeeded)
    pprint(test.real_command)
    pprint(test.return_code)
    pprint(test.failed)
    if test.failed:
      print(red('failed'))


except Exception as e:
  print('error run_command')
  raise e

assert('helloworld' == run_command('echo helloworld'))