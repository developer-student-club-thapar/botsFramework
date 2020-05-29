from Scrapper import *
from Slack_Intigrater import *
from database import *

contain_url(get_updates())
add_item(message)

for i in message:
    serve_slack(i[0])
    print(i)
