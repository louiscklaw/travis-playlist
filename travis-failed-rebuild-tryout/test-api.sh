#!/usr/bin/env bash
# https://docs.travis-ci.com/user/triggering-builds/

set -ex

body='{
"request": {
  "branch":"master"
}
}'

curl -s -X POST \
  -H "Accept: application/json" \
  -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Travis-API-Version: 3" \
  -d "$body" \
  https://api.travis-ci.com/repo/louiscklaw%2Ftravis-playlist/requests

curl -s -X POST \
  -H "Accept: application/json" \
  -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Travis-API-Version: 3" \
  -d "$body" \
  https://api.travis-ci.com/repo/louiscklaw%2Fkicad-playlist/requests
