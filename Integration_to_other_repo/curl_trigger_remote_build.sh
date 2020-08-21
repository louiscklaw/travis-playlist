#!/usr/bin/env bash

# https://docs.travis-ci.com/user/triggering-builds/

set -ex

body="{
  \"request\": {
    \"branch\":\"poc/add-dry-run-no-deploy\",
    \"message\": \"trigger from integration test by travis-playlist/$TRAVIS_BRANCH\",
    \"config\": {
      \"merge_mode\": \"deep_merge\",
      \"env\": {
        \"jobs\": [
          \"SKIP_DEPLOY=YES\"
        ]
      }
    }
  }
}"

curl -s -X POST \
  -H "Content-Type: application/json" \
  -H "Accept: application/json" \
  -H "Travis-API-Version: 3" \
  -H "Authorization: token ${TRAVIS_AUTH_TOKEN}" \
  -d "$body" \
  https://api.travis-ci.com/repo/$1/requests

echo 'done'