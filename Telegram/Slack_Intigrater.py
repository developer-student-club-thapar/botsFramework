from slacker import Slacker
from cred import *

slack = Slacker(Slack_token)

def serve_slack(message):
    slack.chat.post_message(Slack_Channel, message)
    slack.chat.command(
        channel=Slack_Channel_ID,
        command="/poll",
        text="Is this a hackathon link?" "Sure" "Hell No!"
        )
