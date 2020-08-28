#!/usr/bin/env bash

set -ex

cd travis-appium-android-tryout
  docker-compose pull
  docker-compose build
  docker-compose up -d
  sleep 60
  docker-compose logs

  yarn
  node ./helloworld.js
  node ./helloworld_hub.js

cd ..
