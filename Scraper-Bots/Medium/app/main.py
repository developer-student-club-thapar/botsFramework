from scraper.scraping import tag_search_scrape, search_scrape
from secrets import secrets


from flask import Flask, Response
from threading import Thread
from slackeventsapi import SlackEventAdapter
from slack import WebClient
import json


SLACK_SIGNING_SECRET = secrets.SLACK_SIGNING_SECRET
slack_token = secrets.SLACK_API_TOKEN
slack_client = WebClient(slack_token)


greetings = ["hi", "hello", "hello there", "hey"]
startup_comm = "what can you do?"


app = Flask(__name__)


@app.route("/")
def event_hook(request):
    json_dict = json.loads(request.body.decode("utf-8"))
    if json_dict["token"] != secrets.VERIFICATION_TOKEN:
        return {"status": 403}

    if "type" in json_dict:
        if json_dict["type"] == "url_verification":
            response_dict = {"challenge": json_dict["challenge"]}
            return response_dict
    return {"status": 500}
    return


slack_events_adapter = SlackEventAdapter(
    SLACK_SIGNING_SECRET, "/slack/events", app
)  # noqa


@slack_events_adapter.on("app_mention")
def handle_message(event_data):
    def send_reply(value):
        event_data = value
        message = event_data["event"]
        if message.get("subtype") is None:
            command = message.get("text")
            channel_id = message["channel"]
            if any(item in command.lower() for item in greetings):
                message = (
                    "Hello <@%s>! :tada:\nTry *What can you do?*"
                    % message["user"]  # noqa
                )
                slack_client.chat_postMessage(channel=channel_id, text=message)
            elif startup_comm in command.lower():
                slack_client.chat_postMessage(
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
                                "text": "*1️⃣ Use the `@Medium tag` command*. Type `@Medium tag = ` followed by the tag for which you need articles. Try it out by using the command in this channel.\nExample - `Medium tag = Web`",  # noqa
                            },
                        },
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "*2️⃣ Use the `@Medium search` command* If you want to perform your own search then go ahead and type `@Medium searh = ` followed by the search criteria and the number of articles that you want me to fetch.\n Example - `Medium search = Best coding practices, 2`",  # noqa
                            },
                        },
                        {"type": "divider"},
                        {
                            "type": "section",
                            "text": {
                                "type": "mrkdwn",
                                "text": "➕ To start searching, *add me to a channel*",  # noqa
                            },
                        },
                    ],
                )
            elif "tag" in message.get("text"):
                criteria = command.split("=")[1].strip()
                result = tag_search_scrape(criteria)
                i = 0

                slack_client.chat_postMessage(
                    channel=channel_id,
                    text=f"Here are your results for *{criteria}*",  # noqa
                )

                for article in result:
                    if i == 3:
                        break
                    if "img" in result[i]:
                        slack_client.chat_postMessage(
                            channel=channel_id,
                            blocks=[
                                {
                                    "type": "section",
                                    "text": {
                                        "type": "mrkdwn",
                                        "text": f"*<{result[i]['link']}|{result[i]['title']}>* ",  # noqa
                                    },
                                },
                                {
                                    "type": "context",
                                    "elements": [
                                        {
                                            "type": "mrkdwn",
                                            "text": f"* By {result[i]['author']}* \n{result[i]['read_time']}",  # noqa
                                        }
                                    ],
                                },
                                {
                                    "type": "image",
                                    "title": {
                                        "type": "plain_text",
                                        "text": "Image",
                                        "emoji": True,
                                    },  # noqa
                                    "image_url": f"{result[i]['img']}",
                                    "alt_text": "Image",
                                },
                            ],
                        )
                    else:
                        slack_client.chat_postMessage(
                            channel=channel_id,
                            blocks=[
                                {
                                    "type": "section",
                                    "text": {
                                        "type": "mrkdwn",
                                        "text": f"*<{result[i].link}|{result[i].title}>* ",  # noqa
                                    },
                                },
                                {
                                    "type": "context",
                                    "elements": [
                                        {
                                            "type": "mrkdwn",
                                            "text": f"* By {result[i].author}* \n{result[i].read_time}",  # noqa
                                        }
                                    ],
                                },
                            ],
                        )
                    i += 1
            elif "search" in message.get("text"):
                command = command.split("=")[1].strip()
                criteria = command.split(",")[0].strip()
                num = command.split(",")[1].strip()
                result = search_scrape(criteria, num)
                i = 0

                slack_client.chat_postMessage(
                    channel=channel_id,
                    text=f"Here are your results for *{criteria}*",  # noqa
                )

                for article in result:
                    if "img" in result[i]:
                        slack_client.chat_postMessage(
                            channel=channel_id,
                            blocks=[
                                {
                                    "type": "section",
                                    "text": {
                                        "type": "mrkdwn",
                                        "text": f"*<{result[i]['link']}|{result[i]['title']}>* ",  # noqa
                                    },
                                },
                                {
                                    "type": "context",
                                    "elements": [
                                        {
                                            "type": "mrkdwn",
                                            "text": f"* By {result[i]['author']}* \n{result[i]['read_time']}",  # noqa
                                        }
                                    ],
                                },
                                {
                                    "type": "image",
                                    "title": {
                                        "type": "plain_text",
                                        "text": "Image",
                                        "emoji": True,
                                    },  # noqa
                                    "image_url": f"{result[i]['img']}",
                                    "alt_text": "Image",
                                },
                            ],
                        )
                    else:
                        slack_client.chat_postMessage(
                            channel=channel_id,
                            blocks=[
                                {
                                    "type": "section",
                                    "text": {
                                        "type": "mrkdwn",
                                        "text": f"*<{result[i].link}|{result[i].title}>* ",  # noqa
                                    },
                                },
                                {
                                    "type": "context",
                                    "elements": [
                                        {
                                            "type": "mrkdwn",
                                            "text": f"* By {result[i].author}* \n{result[i].read_time}",  # noqa
                                        }
                                    ],
                                },
                            ],
                        )
                    i += 1
            else:
                response = f"I don't get you! Try *What can you do?*"
                slack_client.chat_postMessage(channel=channel_id, text=response)  # noqa

    thread = Thread(target=send_reply, kwargs={"value": event_data})
    thread.start()
    return Response(status=200)
