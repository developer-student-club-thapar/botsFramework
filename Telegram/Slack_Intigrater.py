from slacker import Slacker
from cred import *

slack = Slacker(Slack_token)

def serve_slack(message):
    slack.chat.post_message(Slack_Channel1, message)
    slack.chat.post_message(Slack_Channel1, "/poll Is this a hackathon link?\" \"Sure\" \"Hell No!")
    slack.chat.command(
        channel=Slack_Channel_ID1,
        command="/poll",
        text="Is this a hackathon link?" "Sure" "Hell No!"
        )
serve_slack('hi')
