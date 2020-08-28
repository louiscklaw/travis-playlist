#!/usr/bin/env bash

set -ex

cd travis-appium-android-tryout
  docker-compose pull
  docker-compose build
  docker-compose up -d
  sleep 10
  docker-compose logs

cd ..
