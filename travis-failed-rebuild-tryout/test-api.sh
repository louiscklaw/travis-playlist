#!/usr/bin/env bash
# https://docs.travis-ci.com/user/triggering-builds/

set -ex

body='{
"request": {
  "branch":"tests/add-installLigblib2-sh",
  "message": "test rebuild 1 2 3 "
}
}'

curl -s -X POST \
  -H "Accept: application/json" \
  -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
  -H "Content-Type: application/json" \
  -H "Travis-API-Version: 3" \
  -d "$body" \
  https://api.travis-ci.com/repo/louiscklaw%2Fdotfiles/requests
