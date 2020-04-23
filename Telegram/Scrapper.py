import json
import requests

TOKEN='' #add your bots token

CHAT_ID= #add "-" before chat IDs for groups

URL = "https://api.telegram.org/bot{}/".format(TOKEN)


def get_url(url):
    response = requests.get(url)
    content = response.content.decode("utf8")
    return content


def get_json_from_url(url):
    content = get_url(url)
    js = json.loads(content)
    return js


def get_updates():
    url = URL + "getUpdates"
    js = get_json_from_url(url)
    return js


def chat_id_and_text(updates):
    num_updates = len(updates["result"])
    for i in range(num_updates - 1, -1, -1):
        try:
            typeof=updates["result"][i]["message"]["entities"][0]["type"]
        except KeyError:
            typeof=False
        if updates["result"][i]["message"]["chat"]["id"] == CHAT_ID and typeof == 'url':
            text = updates["result"][i]["message"]["text"]
            text_entities = updates["result"][i]["message"]["entities"][0]["type"]
            print(text, text_entities)

chat_id_and_text(get_updates())


                           
