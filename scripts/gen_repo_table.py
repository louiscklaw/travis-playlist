#!/usr/bin/env python3

import os,sys
from pprint import pprint
from fabric.api import run, local, lcd
import json

RUN_ENVIRONMENT = os.getenv('CI')

github_json=[]

row_template='| `https://travis-ci.com/github/louiscklaw/travis-playlist`  | [![Build Status](https://travis-ci.com/louiscklaw/travis-playlist.svg?branch=master)](https://travis-ci.com/louiscklaw/travis-playlist) | [![Build Status](https://travis-ci.com/louiscklaw/travis-playlist.svg?branch=develop)](https://travis-ci.com/louiscklaw/travis-playlist)|'

repo_list=[
  'louiscklaw/portfolio-preact',
  'louiscklaw/travis-playlist'
]

# PREPARE
f_template = open('build-dashboard/content/project/travis-dashboard-template.md','r')
f_result = open('build-dashboard/content/project/travis-dashboard.md','r+')

def get_github_json():
  '''
  https://developer.github.com/v3/#rate-limiting
  For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.
  example: `curl https://api.github.com/users/louiscklaw/repos?page=1&per_page=2`
  '''

  out_json = []

  for i in range(1,5):
    print('requesting {}'.format(i))
    json_command_result=local('curl https://api.github.com/users/louiscklaw/repos?page={}&per_page=100'.format(i),capture=True)
    out_json = out_json+json.loads(''.join(json_command_result))

  return out_json

if RUN_ENVIRONMENT is None:
  print("local test run, using dummy json")
  f_json = open('scripts/dummy_git_json.json','r')
  github_json=json.loads(''.join(f_json))

else:
  github_json = get_github_json()

str_templates = ''.join(f_template.readlines())
repo_name_list = map(lambda y: y['full_name'], filter(lambda x: 'full_name' in x, github_json))

str_temp=map(lambda x: row_template.replace('louiscklaw/travis-playlist',x),repo_name_list)

str_templates = str_templates.replace('<table_body>', '\n'.join(str_temp))

f_result.write(str_templates)
