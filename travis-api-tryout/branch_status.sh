#!/usr/bin/env bash

set -ex


curl \
  -H "Travis-API-Version: 3" \
  -H "User-Agent: API Explorer" \
  -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
  https://api.travis-ci.com/repo/github/louiscklaw%2Ftravis-playlist/branch/master
