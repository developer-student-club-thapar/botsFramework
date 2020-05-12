from slacker import Slacker
import decimal
from cred import *

slack = Slacker(Slack_token)
metadata=[]

def serve_slack(message):
    obj=slack.chat.post_message(Slack_Channel1, message)
    slack.reactions.add("+1" , channel=obj.__dict__['body']['channel'],
                        timestamp=decimal.Decimal(obj.__dict__['body']['ts']))
    slack.reactions.add("-1" , channel=obj.__dict__['body']['channel'],
                        timestamp=decimal.Decimal(obj.__dict__['body']['ts']))
    global metadata
    metadata.append([decimal.Decimal(obj.__dict__['body']['ts']), obj.__dict__['body']['channel']])



def reaction_feedback(data):
    print(slack.reactions.get(timestamp=data[0], channel=data[1]))

    
    
##serve_slack('Test 182')
##print(metadata)
##reaction_feedback(metadata)
