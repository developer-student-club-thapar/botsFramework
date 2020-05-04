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


@RTMClient.run_on(event="message")
def say_hello(**payload):
    data = payload["data"]
    web_client = payload["web_client"]

    if "text" in data:
        if "Hello" in data["text"]:
            channel_id = data["channel"]
            thread_ts = data["ts"]
            user = data["user"]
            # This is not username but user ID

            web_client.chat_postMessage(
                channel=channel_id, text=f"Hi <@{user}>!", thread_ts=thread_ts
            )


@RTMClient.run_on(event="message")
def command(**payload):
    data = payload["data"]
    web_client = payload["web_client"]
    if "text" in data and data["text"].startswith("Medium"):
        text = data["text"]
        channel_id = data["channel"]
        arr = text.split()

        if len(arr) == 2:
            arr = text.split("=")
            if "tag" in arr[0].split():
                tag(arr[1], web_client, channel_id)
            else:
                search(arr[1], web_client, channel_id)
        elif len(arr) == 4:
            if "tag" in arr:
                tag(arr[3], web_client, channel_id)
            else:
                search(arr[3], web_client, channel_id)


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
