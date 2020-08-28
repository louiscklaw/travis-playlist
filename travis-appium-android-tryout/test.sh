#!/usr/bin/env bash

set -ex

cd travis-appium-android-tryout
  docker-compose up -d
  sleep 30
  docker-compose logs

cd ..
