import json
import requests
from cred import *  # noqa

# TOKEN= manually add your bots token
# CHAT_ID= manualy add "-" before chat IDs for groups

message = []
Black_List = ["twitter.com", "//t.me/"]
URL = "https://api.telegram.org/bot{}/".format(TOKEN1)  # noqa


def remove_dublicate(message):
    try:
        range = len(message)
        i = 0
        while i < range:
            if message[i][2] == message[i + 1][2]:
                message.pop(i + 1)
                i -= 1
            i += 1
    except IndexError:
        pass


def get_url(url):
    response = requests.get(url)
    content = response.content.decode("utf8")
    return content


def get_json_from_url(url):
    content = get_url(url)
    js = json.loads(content)
    return js


def get_updates(offset=None):
    url = URL + "getUpdates"
    if offset:
        url += "?offset={}".format(offset)
    js = get_json_from_url(url)
    return js


# def add_to_csv(update_id, message_test, group_name)


def get_last_update_id(updates):
    update_ids = []
    for update in updates["result"]:
        update_ids.append(int(update["update_id"]))
    return max(update_ids)


def contain_url(updates):
    num_updates = len(updates["result"])
    for i in range(num_updates - 1, -1, -1):
        try:
            if updates["result"][i]["message"]["chat"]["id"] == CHAT_ID1:  # noqa
                entities = updates["result"][i]["message"]["entities"]
        except KeyError:
            pass
        else:
            for j in range(0, len(updates["result"][i]["message"]["entities"])):
                if updates["result"][i]["message"]["entities"][j]["type"] == "url":
                    offset = updates["result"][i]["message"]["entities"][j]["offset"]
                    length = updates["result"][i]["message"]["entities"][j]["length"]
                    text_s = updates["result"][i]["message"]["text"].encode("ascii", "ignore").decode("ascii")
                    url = text_s[(offset) : offset + length]  # noqa
                    text_entities = updates["result"][i]["message"]["entities"][j]["type"]
                    input_data = [
                        text_s,
                        url,
                        updates["result"][i]["update_id"],
                    ]
                    if input_data not in message:
                        message.append(input_data[:])
        try:
            if updates["result"][i]["message"]["chat"]["id"] == CHAT_ID1:  # noqa
                entities = updates["result"][i]["message"]["caption_entities"]
        except KeyError:
            pass
        else:
            for j in range(0, len(updates["result"][i]["message"]["caption_entities"])):
                if updates["result"][i]["message"]["caption_entities"][j]["type"] == "url":
                    offset = updates["result"][i]["message"]["caption_entities"][j]["offset"]
                    length = updates["result"][i]["message"]["caption_entities"][j]["length"]
                    text_s = updates["result"][i]["message"]["caption"].encode("ascii", "ignore").decode("ascii")
                    url = text_s[(offset - 2) : offset + length + 3]  # noqa
                    text_entities = updates["result"][i]["message"]["caption_entities"][j]["type"]
                    input_data = [
                        text_s,
                        url,
                        updates["result"][i]["update_id"],
                    ]
                    if input_data not in message:
                        message.append(input_data[:])
    message.reverse()
    Remove_Blacklisted_URL(message)


def get_last_chat_id_and_text(updates):
    num_updates = len(updates["result"])
    last_update = num_updates - 1
    text = updates["result"][last_update]["message"]["text"]
    chat_id = updates["result"][last_update]["message"]["chat"]["id"]
    return (text, chat_id)


def Remove_Blacklisted_URL(message):
    try:
        range = len(message)
        i = 0
        while i < range:
            for j in Black_List:
                if j in message[i][1]:
                    message.pop(i)
                    i -= 1
                i += 1
    except IndexError:
        pass
