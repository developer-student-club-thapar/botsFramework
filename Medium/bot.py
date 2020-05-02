from scraping import tag_search, search
import os
from slack import WebClient
from slack.errors import SlackApiError

tag_list = tag_search("Slack")
search_list = search("Slack", 3)

print(tag_list)
print(search_list)

# Code for the bot!
client = WebClient(token=os.environ["SLACK_API_TOKEN"])
channel = "#bot-test"

try:
    response = client.chat_postMessage(channel=channel, text="Hello world!")
    assert response["message"]["text"] == "Hello world!"
except SlackApiError as e:
    # You will get a SlackApiError if "ok" is False
    assert e.response["ok"] is False
    assert e.response["error"]  # str like 'invalid_auth', 'channel_not_found'
    print(f"Got an error: {e.response['error']}")
