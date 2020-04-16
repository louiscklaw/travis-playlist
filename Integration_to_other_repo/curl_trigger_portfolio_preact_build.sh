#!/usr/bin/env bash

set -ex

body='{
"request": {
"branch":"develop"
}}'

curl -s -X POST \
   -H "Content-Type: application/json" \
   -H "Accept: application/json" \
   -H "Travis-API-Version: 3" \
   -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
   -d "$body" \
   https://api.travis-ci.com/repo/$1/requests
