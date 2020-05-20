from slacker import Slacker
import decimal
import json
from cred import *

slack = Slacker(Slack_token)
metadata=[[decimal.Decimal('1589701276.001300'), 'C011P8QDCR1']]

def serve_slack(message):
    obj=slack.chat.post_message(Slack_Channel1, message)
    slack.reactions.add("+1" , channel=obj.__dict__['body']['channel'],
                        timestamp=decimal.Decimal(obj.__dict__['body']['ts']))
    slack.reactions.add("-1" , channel=obj.__dict__['body']['channel'],
                        timestamp=decimal.Decimal(obj.__dict__['body']['ts']))
    global metadata
    metadata.append([decimal.Decimal(obj.__dict__['body']['ts']), obj.__dict__['body']['channel']])



def reaction_feedback(data):
    react=slack.reactions.get(timestamp=data[0][0], channel=data[0][1])
##    print(react["message"][0]["bot_profile"][0]["icons"][0]["reactions"][0]["name"])
##    if react["message"]["bot_profile"]["icons"]["reactions"]["name"]=="+1":
##        print(reaction["message"]["bot_profile"]["icons"]["reactions"]["name"]["count"])

    
## Required for Testing    
##serve_slack('Test 182')
##print(metadata)
##reaction_feedback(metadata)
