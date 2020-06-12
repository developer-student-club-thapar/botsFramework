from Scrapper import *
from Slack_Intigrater import *
from database import *

# From Scrapper.py to get all mesages that contain url
contain_url(get_updates())
# Removes Dublicate Messages (Due to the message containing multiple url)
Serve_Slack(message)
# Adds the message and metadata to google sheet
Add_to_Sheets(message)
