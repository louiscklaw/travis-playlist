#!/usr/bin/env python

# reference build https://travis-ci.org/louiscklaw/test_git_repo/builds/625335510
# https://docs.travis-ci.com/user/environment-variables/

import os, sys, re, subprocess
import slack

SLACK_TOKEN = os.environ['SLACK_TOKEN']

def slack_message(message, channel):
  client = slack.WebClient(token=SLACK_TOKEN)
  response = client.chat_postMessage(
      channel=channel,
      text=message,
      username='TravisMergerBot',
      icon_url=':sob:'
      )

slack_message(sys.argv[2], sys.argv[1])
