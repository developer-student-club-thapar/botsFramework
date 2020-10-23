from slacker import Slacker
import decimal
import json
from cred import *  # noqa

slack = Slacker(Slack_token)  # noqa
metadata = [[decimal.Decimal("1589701276.001300"), "C011P8QDCR1"]]


def Serve_Slack(message):
    Update_ID = []
    for i in range(len(message)):
        if message[i][2] not in Update_ID:
            Update_ID.append(message[i][2])

    for i in range(len(message)):
        if message[i][2] in Update_ID:
            Update_ID.pop(0)
            obj = slack.chat.post_message(Slack_Channel1, message[i][0])  # noqa
            slack.reactions.add(
                "+1", channel=obj.__dict__["body"]["channel"], timestamp=decimal.Decimal(obj.__dict__["body"]["ts"]),
            )
            slack.reactions.add(
                "-1", channel=obj.__dict__["body"]["channel"], timestamp=decimal.Decimal(obj.__dict__["body"]["ts"]),
            )
            message[i].append((obj.__dict__["body"]["ts"]))
            message[i].append(obj.__dict__["body"]["channel"])
            # print(message[i])


def Reaction_Feedback(data):
    reactions = []
    for j in range(len(data)):
        react = slack.reactions.get(timestamp=data[j][0], channel=data[j][1])
        reaction = json.loads(json.dumps(react.body))
        Num_Reaction = len(reaction["message"]["reactions"])
        for i in range(Num_Reaction):
            try:
                if reaction["message"]["reactions"][i]["name"] == "+1":
                    Thumbs_Up = reaction["message"]["reactions"][i]["count"]
            except KeyError:
                pass
            try:
                if reaction["message"]["reactions"][i]["name"] == "-1":
                    Thumbs_Down = reaction["message"]["reactions"][i]["count"]
            except KeyError:
                pass
        reactions.append([data[j][2], Thumbs_Up, Thumbs_Down])
    return reactions
