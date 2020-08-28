#!/usr/bin/env bash

reset

docker kill $(docker ps -qa)
docker rm $(docker ps -qa)

reset

set -ex

docker-compose up -d

sleep 30
