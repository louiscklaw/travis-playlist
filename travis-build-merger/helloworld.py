import os
import slack

client = slack.WebClient(token=os.environ['SLACK_API_TOKEN'])

response = client.chat_postMessage(
    channel='#travis-build-result',
    text="Hello world!",
    username='TravisMergerBot',
    icon_url=':sob:'
    )
assert response["ok"]
assert response["message"]["text"] == "Hello world!"
