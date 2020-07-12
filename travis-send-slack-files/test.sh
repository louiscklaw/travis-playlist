#!/usr/bin/env bash

set -ex

# use case 1
pipenv run python3 send_slack_file.py _debug 'message title' 'page change detected' './helloworld.png'

# use case 2
pipenv run python3 send_slack_file.py _debug '' 'page change detected' './helloworld.png'