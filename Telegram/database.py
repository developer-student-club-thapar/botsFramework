import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pprint

scope=['https://spreadsheets.google.com/feeds',
        'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('Client_Secret.json', scope)
client = gspread.authorize(creds)

sheets = client.open('Slack_Bots').sheet1

# pp = pprint.PrettyPrinter()
# Scraped = sheets.col_values(3)                          #Note the index staarts from 1
# pp.pprint(Scraped)

def Add_to_Sheets(data,index = 2):
    for i in data:
        new_row=i
        sheets.insert_row(new_row, index)

# pp = pprint.PrettyPrinter()
# Scraped = sheets.get_all_records()                          #Note the index starts from 1
# pp.pprint(Scraped)