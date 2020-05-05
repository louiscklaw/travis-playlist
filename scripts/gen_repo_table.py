#!/usr/bin/env python3

import os,sys
from pprint import pprint
from fabric.api import run, local, lcd
import json

RUN_ENVIRONMENT = os.getenv('CI')
ENV_CI = os.getenv('CI')
DEBUG = ENV_CI == None

github_json=[]

row_content = '''
`repo_name`
| <a href="https://github.com/louiscklaw/repo_name" target="_blank"><img src="https://simpleicons.org/icons/github.svg" style="height: 1em;"/></a>
| [![Build Status](https://travis-ci.com/repo1.svg?branch=master)](https://travis-ci.com/repo1)
| [![Build Status](https://travis-ci.com/repo1.svg?branch=develop)](https://travis-ci.com/repo1)
'''.replace('\n','')


row_template='''| row_content_1 | row_content_2 | row_content_3 | row_content_4 | row_content_5 |'''.replace('\n','').strip()

repo_list=[
  'louiscklaw/portfolio-preact',
  'louiscklaw/travis-playlist'
]

# PREPARE
f_template = open('build-dashboard/content/project/travis-dashboard-template.md','r')
f_result = open('build-dashboard/content/project/travis-dashboard.md','w')

def get_md_thead(col=5):
  col_header = ['repo_name','link',':master:','develop']
  table_bottom_line = [':----',':---:',':---:',':---:']

  whole_header = col_header * col
  whole_bottom_line = table_bottom_line * col

  string_header = "| "+' | '.join(whole_header)+" | "
  string_bottom_line = "| "+' | '.join(whole_bottom_line)+" |"

  return string_header +'\n'+ string_bottom_line +'\n'

def get_row_content(repo):
  return row_content.replace('repo1',repo).replace('repo_name',repo.replace('louiscklaw/',''))

def get_github_json():
  '''
  https://developer.github.com/v3/#rate-limiting
  For unauthenticated requests, the rate limit allows for up to 60 requests per hour. Unauthenticated requests are associated with the originating IP address, and not the user making requests.
  example: `curl https://api.github.com/users/louiscklaw/repos?page=1&per_page=2`
  '''

  out_json = []
  if DEBUG :
    f_json_page1 = open('./scripts/dummy_page_1.json')
    f_json_page2 = open('./scripts/dummy_page_2.json')

    json_page_1 = json.loads(''.join(f_json_page1.readlines()))[0:5]
    # json_page_2 = json.loads(''.join(f_json_page2.readlines()))
    json_page_2=['']

    # pprint(len(json_page_1))
    # pprint(len(json_page_2))
    # pprint(len(json_page_1+json_page_2))

    return json_page_1+json_page_2
  else:
    for i in range(1,20+1):
      print('requesting {}'.format(i))
      json_command_result=local('curl https://api.github.com/users/louiscklaw/repos?page={}&per_page=100'.format(i),capture=True)
      out_json = out_json+json.loads(''.join(json_command_result))

    return out_json

github_json = get_github_json()

str_templates = ''.join(f_template.readlines())
repo_name_list = map(lambda y: y['full_name'], filter(lambda x: 'full_name' in x, github_json))

repo_name_list = list(repo_name_list)

print(len(list(repo_name_list)))

last_repo_name_list_idx = len(repo_name_list) -1
repo_name_list_in_3 = [
  [
    repo_name_list[i] if i <= last_repo_name_list_idx  is not None else '',
    repo_name_list[i+1] if i+1 <= last_repo_name_list_idx is not None else '',
    repo_name_list[i+2] if i+2 <= last_repo_name_list_idx is not None else '',
    repo_name_list[i+3] if i+3 <= last_repo_name_list_idx is not None else '',
    repo_name_list[i+4] if i+4 <= last_repo_name_list_idx is not None else ''
  ] for i in range(0,last_repo_name_list_idx, 5)
]

str_temp=map(
  lambda x: row_template
    .replace('row_content_1', get_row_content(x[0]) if x[0] != '' else '')
    .replace('row_content_2', get_row_content(x[1]) if x[1] != '' else '')
    .replace('row_content_3', get_row_content(x[2]) if x[2] != '' else '')
    .replace('row_content_4', get_row_content(x[3]) if x[3] != '' else '')
    .replace('row_content_5', get_row_content(x[4]) if x[4] != '' else '')
  ,sorted(repo_name_list_in_3))

str_temp = get_md_thead() + '\n'.join(str_temp)

str_templates = str_templates.replace('<table_body>', str_temp)

f_result.write(str_templates)
