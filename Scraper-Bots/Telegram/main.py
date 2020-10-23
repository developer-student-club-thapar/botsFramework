from Scrapper import *  # noqa
from Slack_Intigrater import *  # noqa
from database import *  # noqa

# From Scrapper.py to get all mesages that contain url
contain_url(get_updates())  # noqa
# Removes Dublicate Messages (Due to the message containing multiple url)
Serve_Slack(message)  # noqa
# Adds the message and metadata to google sheet
Add_to_Sheets(message)  # noqa
