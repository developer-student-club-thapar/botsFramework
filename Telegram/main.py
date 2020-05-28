from Scrapper import *
from Slack_Intigrater import *
contain_url(get_updates())
for i in message:
    serve_slack(i[0])
    print(i)
