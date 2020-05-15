from scraping import tag_search_scrape  # search_scrape
import secrets


from flask import Flask
from slackeventsapi import SlackEventAdapter
from slack import WebClient
import json


SLACK_SIGNING_SECRET = secrets.SLACK_SIGNING_SECRET
slack_token = secrets.SLACK_API_TOKEN
slack_client = WebClient(slack_token)


greetings = ["hi", "hello", "hello there", "hey"]


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
    message = event_data["event"]
    if message.get("subtype") is None:
        command = message.get("text")
        channel_id = message["channel"]
        if any(item in command.lower() for item in greetings):
            message = "Hello <@%s>! :tada:" % message["user"]
            slack_client.chat_postMessage(channel=channel_id, text=message)
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
            print("idhar search karna hai")


# Start the server on port 3000
if __name__ == "__main__":
    app.run(port=3000, debug=True)
