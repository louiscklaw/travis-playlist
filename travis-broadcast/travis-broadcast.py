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

def main(message, channel):
  slack_message(message, channel)

if __name__ == '__main__':
  message = sys.argv[2]
  channel = sys.argv[1]

  if channel[0:1] == '#':
    # \#travis-build-result
    pass
  elif channel == 'need_help':
    channel = '#travis-need-help'

  main(message, channel)
