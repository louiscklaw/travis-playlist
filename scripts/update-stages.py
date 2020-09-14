#!/usr/bin/env python

import os,sys
from pprint import pprint

from subprocess import run
import shlex

import re

replace_label='# update-stages.py'
replace_label_start='{} start'.format(replace_label)
replace_label_end='{} end'.format(replace_label)

dir_skip_list=[
  '.*old',
  'tmp',
  '.git',
  'gh-pages',
  'scripts',
  'node_modules'
]

filtered_sub_dirs = filter(lambda x: x not in dir_skip_list, list(os.walk(".", topdown=False))[-1][1])
filtered_sub_dirs = filter(
  lambda subdir:
    all(map(lambda dir_to_skip: re.match(dir_to_skip, subdir) == None, dir_skip_list)),
  filtered_sub_dirs)

template=r'''
  # stages for dirname, test_dirname
  - name: test_dirname
    if: branch =~ /.*dirname.*/

'''

output=''

for dirname in filtered_sub_dirs:
  output+=template.replace('dirname',dirname)

output='''
  {}
  {}
  {}
'''.format(replace_label_start, output, replace_label_end).strip()

fo=open('/tmp/stages.tmp','w')
fo.writelines(output)

fo.close()

f_stages_yml_in = open('./.travis-stages.yml','r')
temp = ''.join(f_stages_yml_in.readlines())
f_stages_yml_in.close()

temp = re.sub(r'{}.+?{}'.format(replace_label_start, replace_label_end),
    '{}'.format(output),
    temp, count=1,flags=re.MULTILINE|re.DOTALL)


f_stages_yml_out=open('./.travis-stages.yml','w')
f_stages_yml_out.writelines(temp)
f_stages_yml_out.close()
