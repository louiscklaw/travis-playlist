#!/usr/bin/env bash

set -ex

cd travis-appium-android-tryout
  docker-compose pull 2>&1
  # docker-compose build
  # docker-compose up -d
  # sleep 10
  # docker-compose logs

cd ..
