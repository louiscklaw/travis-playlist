#!/usr/bin/env python3

import os,sys,re

print("helloworld")


temp=''

travis_list = [
  'appium-playlist',
  'travis-playlist',
  'portfolio-preact'
]

def get_travis_project_link(proj_name):
  return 'https://travis-ci.com/louiscklaw/{}'.format(proj_name)

def get_travis_status_svg_link(repository, branch):
  return '{}.svg?branch={}'.format(repository, branch)

def get_travis_status_svg(repository, branch):
  return '[![Build Status]({})]({})'.format(
    get_travis_status_svg_link(repository, branch),
    repository
  )

def get_travis_master_develop_row(repository):
  return '| {} | {} | {} |\n'.format(
  repository,
  get_travis_status_svg(repository, 'master'),
  get_travis_status_svg(repository, 'develop')
  )

def get_table():
  return '''
| Repository   |      Master      |  Develop |
|----------|:-------------:|------:|
{}
'''.format(
  ''.join(get_travis_master_develop_row(get_travis_project_link(temp))
    for temp in travis_list)
).strip()

with open('./index.template','r') as f_template:
  temp = ''.join(f_template.readlines())


with open('./index.md','w') as f_index:
  f_index.write(temp.replace('<<content>>',get_table()))