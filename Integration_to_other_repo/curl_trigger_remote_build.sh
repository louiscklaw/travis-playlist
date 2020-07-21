#!/usr/bin/env bash

# https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=2ahUKEwjjmNvM0OzoAhW0L6YKHSTpA80QFjAAegQIQBAB&url=https%3A%2F%2Fdocs.travis-ci.com%2Fuser%2Ftriggering-builds%2F&usg=AOvVaw3Wws4vYIrJjOWVBGeQ91oa

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