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


def get_updates(offset=None):
    url = URL + "getUpdates?timeout=256"
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
        if updates["result"][i]["message"]["chat"]["id"] == CHAT_ID:
            try:
                entities=updates["result"][i]["message"]["entities"]
                for j in range (0,len(updates["result"][i]["message"]["entities"])):
                    if updates["result"][i]["message"]["entities"][j]["type"]== "url":
                        text_s = updates["result"][i]["message"]["text"].encode('ascii', 'ignore').decode('ascii')
                        text_entities = updates["result"][i]["message"]["entities"][j]["type"]
                        print(text_s, text_entities)
            except KeyError:
                print('no url')
def get_last_chat_id_and_text(updates):
    num_updates = len(updates["result"])
    last_update = num_updates - 1
    text = updates["result"][last_update]["message"]["text"]
    chat_id = updates["result"][last_update]["message"]["chat"]["id"]
    return (text, chat_id)
   
def main():
    last_update_id = None
    while True:
        updates = get_updates(last_update_id)
        if len(updates["result"]) > 0:
            last_update_id = get_last_update_id(updates) + 1
            contain_url(updates)
        time.sleep(0.5)


if __name__ == '__main__':
    main()
                           
