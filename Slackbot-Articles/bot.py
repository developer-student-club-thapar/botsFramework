from scraping import tag_search, search

tag_list = tag_search("Slack")
search_list = search("Slack", 3)

print(tag_list)
print(search_list)

# Code for the bot!
