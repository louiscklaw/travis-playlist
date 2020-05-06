#!/usr/bin/env python3

import os,sys
from pprint import pprint

from fabric.api import local, run, lcd, settings

for i in range(0,10):
  local('curl travis-ci.com/louiscklaw/travis-playlist/build/')

print("helloworld")


curl -H "Travis-API-Version: 3" -H "User-Agent: API Explorer" \
  -H "Authorization: token KX1qomlge1NqPRyXjP_I8w" \
  http://travis-ci.com/louiscklaw%2Ftravis-playlist/builds.json

curl http://travis-ci.org/louiscklaw%2Ftravis-playlist/builds.json