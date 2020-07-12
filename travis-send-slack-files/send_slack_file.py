#!/usr/bin/env python

# reference build https://travis-ci.org/louiscklaw/test_git_repo/builds/625335510
# https://docs.travis-ci.com/user/environment-variables/

import os, sys, re, subprocess
import slack

SLACK_TOKEN = os.environ['SLACK_TOKEN']

def sendSlackFileMessage(message, channel,file_path,  title=''):
  message_title = title if title=='' else os.path.basename(file_path)
  client = slack.WebClient(token=SLACK_TOKEN)
  response = client.files_upload(
    channels=channel,
    initial_comment=message,
    title=title,
    file=file_path
    )

if __name__ == '__main__':
  channel = sys.argv[1]
  title = sys.argv[2]
  message = sys.argv[3]
  file_to_send = sys.argv[4]

  # print('channel:',channel)
  # print('title:',title)
  # print('message:',message)
  # print('file_to_send:',file_to_send)

  if channel[0:1] == '#':
    # \#travis-build-result
    pass
  elif channel == 'need_help':
    channel = '#travis-need-help'

  sendSlackFileMessage(message, channel, file_to_send, title)
