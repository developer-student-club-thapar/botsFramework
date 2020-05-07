from scraping import tag_search_scrape, search_scrape


import os
import sys
import traceback
from slack import RTMClient
import time

import logging

logging.basicConfig(level=logging.DEBUG)


slack_token = os.environ["SLACK_API_TOKEN"]
DELAY = 3
greetings = ["hi", "hello", "hello there", "hey"]
EXAMPLE_COMM = "Medium What can you do?"


@RTMClient.run_on(event="message")
def say_hello(**payload):
    data = payload["data"]
    web_client = payload["web_client"]

    if "text" in data:
        if "text" in data and data["text"].startswith("Medium"):

            user = data["user"]
            invalid_comm_text = f"Hi <@{user}>!\nNot sure what you mean. Try *{EXAMPLE_COMM}* to know about my capabilities."  # noqa

            command = data["text"].lower()
            channel_id = data["channel"]
            arr = command.split()

            if len(arr) > 1:
                for greeting in greetings:
                    if greeting == arr[1].lower():
                        response = f"Hi <@{user}>! Try *{EXAMPLE_COMM}*"
                        web_client.chat_postMessage(
                            channel=channel_id, text=response
                        )  # noqa
                        return
            else:
                response = f"Hi <@{user}>! Try *{EXAMPLE_COMM}*"
                web_client.chat_postMessage(channel=channel_id, text=response)
                return

            if command.startswith(EXAMPLE_COMM.lower()):
                response = (
                    f"Well I was designed to fetch Medium Articles for you!"  # noqa
                )
                web_client.chat_postMessage(
                    channel=channel_id,
                    blocks=[
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "Hey there 👋 I'm MediumBot. I'm here to help you fetch articles from Medium directly to Slack.\nThere are two ways to quickly search articles:",  # noqa
                            },
                        },
                        {"type": "divider"},
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "*1️⃣ Use the `Medium tag` command*. Type `Medium tag = ` followed by the tag for which you need articles. Try it out by using the command in this channel.\nExample - `Medium tag = Web`",  # noqa
                            },
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "*2️⃣ Use the `Medium search` command* If you want to perform your own search then go ahead and type `Medium searh = ` followed by the search criteria.\n Example - `Medium search = Best coding practices`",  # noqa
                            },
                        },
                        {"type": "divider"},
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "➕ To start searching, *add me to a channel* and I'll introduce myself. ",  # noqa
                            },
                        },
                    ],
                )
            elif len(arr) == 2:
                arr = command.split("=")
                if "tag" in arr[0].split():
                    tag(arr[1], web_client, channel_id)
                elif "search" in arr[0].split():
                    search(arr[1], web_client, channel_id)
                else:
                    invalidComm(web_client, channel_id, invalid_comm_text)
            elif len(arr) == 4:
                if "tag" in arr:
                    tag(arr[3], web_client, channel_id)
                elif "search" in arr:
                    search(arr[3], web_client, channel_id)
                else:
                    invalidComm(web_client, channel_id, invalid_comm_text)
            elif len(arr) == 3:
                if "tag=" in arr:
                    tag(arr[2], web_client, channel_id)
                elif "search=" in arr:
                    search(arr[2], web_client, channel_id)
                else:
                    invalidComm(web_client, channel_id, invalid_comm_text)
            else:
                invalidComm(web_client, channel_id, invalid_comm_text)


@RTMClient.run_on(event="channel_joined")
def Hello(**payload):
    data = payload["data"]
    web_client = payload["web_client"]
    channel_id = data["channel"]["id"]
    response = f"Howdy-doody! Try `{EXAMPLE_COMM}` to know my capabilities"
    web_client.chat_postMessage(channel=channel_id, text=response)


def invalidComm(web_client, channel_id, invalid_comm_text):
    web_client.chat_postMessage(channel=channel_id, text=invalid_comm_text)


def tag(criteria, web_client, channel_id):
    result = tag_search_scrape(criteria)
    i = 0

    web_client.chat_postMessage(
        channel=channel_id, text=f"Here are your results for *{criteria}*",
    )

    for link in result:
        if i == 2:
            break
        link = link.split("?")[0]

        web_client.chat_postMessage(
            channel=channel_id, text=link,
        )
        i += 1
        time.sleep(DELAY)


def search(criteria, web_client, channel_id):
    result = search_scrape(criteria)

    web_client.chat_postMessage(
        channel=channel_id, text=f"Here are your results for *{criteria}*",
    )

    for link in result:
        web_client.chat_postMessage(
            channel=channel_id, text=link,
        )
        time.sleep(DELAY)


def main():
    try:
        rtm_client = RTMClient(token=slack_token)
        rtm_client.start()
    except KeyboardInterrupt:
        print("Shutdown requested...exiting")
    except Exception:
        traceback.print_exc(file=sys.stdout)
    sys.exit(0)


if __name__ == "__main__":
    main()
