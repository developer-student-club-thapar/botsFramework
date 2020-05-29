from Scrapper import *
from Slack_Intigrater import *
from database import *

contain_url(get_updates())             ## From Scrapper.py to get all mesages that contain url
remove_dublicate(message)              ## Removes Dublicate Messages (Due to the message containing multiple url)

Add_to_Sheets(message)                      ## Adds the message and metadata to google sheet

for i in message:                      ## Serves message to slack | Possible incorporate loop into serve_slack
    serve_slack(i[0])
    print(i)
