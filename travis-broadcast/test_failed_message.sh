#!/usr/bin/env bash

set -e


body="
Travis build failed: \n\n
TRAVIS_BUILD_WEB_URL: $TRAVIS_BUILD_WEB_URL \n
TRAVIS_JOB_WEB_URL: $TRAVIS_JOB_WEB_URL \n
TRAVIS_BRANCH: $TRAVIS_BRANCH \n
TRAVIS_COMMIT_MESSAGE: $TRAVIS_COMMIT_MESSAGE \n
\n\n ~ end ~
"

echo -e $body