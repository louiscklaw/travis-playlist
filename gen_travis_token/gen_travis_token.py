#!/usr/bin/env python3

import os,sys
from pprint import pprint
from subprocess import check_output
from string import Template
from fabric.api import local, lcd
from string import Template

from multiprocessing import Pool

if len(sys.argv) < 1:
  raise "the path to store the generated credential file wanted."
  sys.exit(99)

CREDENTIAL_FILEPATH = os.path.join(sys.argv[1], 'credentials.yml')

cwd = os.getcwd()

TRAVIS_AUTH_TOKEN=os.getenv('TRAVIS_AUTH_TOKEN')
TRAVIS_TOKEN=os.getenv('TRAVIS_TOKEN')
GITHUB_TOKEN=os.getenv('GITHUB_TOKEN')
SLACK_TOKEN=os.getenv('SLACK_TOKEN')
SLACK_NOTIFICATIONS=os.getenv('SLACK_NOTIFICATIONS')
DOCKERHUB_USER=os.getenv('DOCKERHUB_USER')
DOCKERHUB_PASSWORD=os.getenv('DOCKERHUB_PASSWORD')


env_list=[
  'TRAVIS_AUTH_TOKEN={}'.format(TRAVIS_AUTH_TOKEN),
  'TRAVIS_TOKEN={}'.format(TRAVIS_TOKEN),
  'GITHUB_TOKEN={}'.format(GITHUB_TOKEN),
  'SLACK_TOKEN={}'.format(SLACK_TOKEN),
  SLACK_NOTIFICATIONS,
  "DOCKERHUB_USER={}".format(DOCKERHUB_USER),
  'DOCKERHUB_PASSWORD={}'.format(DOCKERHUB_PASSWORD)
]

secure_template = Template('''
notifications:
  slack:
    secure: $SLACK_NOTIFICATIONS

env:
  global:
    # SLACK_TOKEN:
    - secure: $SLACK_TOKEN

    # GITHUB_TOKEN:
    - secure: $GITHUB_TOKEN

    # TRAVIS_TOKEN:
    - secure: $TRAVIS_TOKEN

    # TRAVIS_AUTH_TOKEN:
    - secure: $TRAVIS_AUTH_TOKEN

    # DOCKERHUB_USER:
    - secure: $DOCKERHUB_USER

    # DOCKERHUB_PASSWORD:
    - secure: $DOCKERHUB_PASSWORD
'''.strip())

def get_travis_encrypt(input_string):
  print('getting travis encrypted')
  encrypt_command = 'travis encrypt --com '+input_string
  # return check_output(encrypt_command.split(' ')).decode('utf-8')

  with lcd(cwd):
    return local(encrypt_command,capture=True)

# def f(a,b):
#     return a *b

# def paralllel_helper(c): return f(*c)

if __name__ == '__main__':
    p = Pool(10)
    result_list = p.map(get_travis_encrypt, env_list)
    p.close()
    p.join()

    with open(CREDENTIAL_FILEPATH,'w') as f_credential:
      f_credential.write(''.join(
        secure_template.substitute(
          TRAVIS_AUTH_TOKEN=result_list[0],
          TRAVIS_TOKEN=result_list[1],
          GITHUB_TOKEN=result_list[2],
          SLACK_TOKEN=result_list[3],
          SLACK_NOTIFICATIONS=result_list[4],
          DOCKERHUB_USER=result_list[5],
          DOCKERHUB_PASSWORD=result_list[6]
        )
      ))