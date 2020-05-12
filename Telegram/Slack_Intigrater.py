from slacker import Slacker
import decimal
from cred import *

slack = Slacker(Slack_token)

def serve_slack(message):
    obj=slack.chat.post_message(Slack_Channel1, message)
    slack.reactions.add("+1" , channel=obj.__dict__['body']['channel'], timestamp=decimal.Decimal(obj.__dict__['body']['ts']))
    slack.reactions.add("-1" , channel=obj.__dict__['body']['channel'], timestamp=decimal.Decimal(obj.__dict__['body']['ts']))
    
##    slack.chat.post_message(Slack_Channel1, "/poll Is this a hackathon link?\" \"Sure\" \"Hell No!")
##    slack.chat.command(
##        channel=Slack_Channel_ID1,
##        command="/poll",
##        text="Is this a hackathon link?" "Sure" "Hell No!"
##        )
##serve_slack('Test 182')
        
