#!/usr/bin/env python3

import os,sys
from pprint import pprint
from fabric.api import run, local, lcd
import json

RUN_ENVIRONMENT = os.getenv('CI')

github_json=[]

row_template='''
| `repo1`
| [![Build Status](https://travis-ci.com/repo1.svg?branch=master)](https://travis-ci.com/repo1)
| [![Build Status](https://travis-ci.com/repo1.svg?branch=develop)](https://travis-ci.com/repo1)
| `repo2`
| [![Build Status](https://travis-ci.com/repo2.svg?branch=master)](https://travis-ci.com/repo2)
| [![Build Status](https://travis-ci.com/repo2.svg?branch=develop)](https://travis-ci.com/repo2)
| `repo3`
| [![Build Status](https://travis-ci.com/repo3.svg?branch=master)](https://travis-ci.com/repo3)
| [![Build Status](https://travis-ci.com/repo3.svg?branch=develop)](https://travis-ci.com/repo3)
|
'''.replace('\n','').strip()

repo_list=[
  'louiscklaw/portfolio-preact',
  'louiscklaw/travis-playlist'
]

# PREPARE
f_template = open('build-dashboard/content/project/travis-dashboard-template.md','r')
f_result = open('build-dashboard/content/project/travis-dashboard.md','w')

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

repo_name_list = list(repo_name_list)
repo_name_list_in_3 = [[repo_name_list[i],repo_name_list[i+1],repo_name_list[i+2]] for i in range(0,len(repo_name_list),3)]


str_temp=map(
  lambda x: row_template
    .replace('repo1',x[0])
    .replace('repo2',x[1])
    .replace('repo3',x[2])
  ,sorted(repo_name_list_in_3))

str_templates = str_templates.replace('<table_body>', '\n'.join(str_temp))

f_result.write(str_templates)
