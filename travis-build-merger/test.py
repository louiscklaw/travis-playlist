#!/usr/
import os, re, subprocess
import slack

from fabric.api import local, shell_env, lcd, run, settings

with settings(warn_only=True):
  result = local('sh ./error.sh', capture=True)
  print(result.failed)
  result = local('hostname', capture=True)
  print(result.failed)