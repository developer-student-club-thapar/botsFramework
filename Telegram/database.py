import gspread
from oauth2client.service_account import ServiceAccountCredentials

scope=['https://spreadsheets.google.com/feeds',
        'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('Client_Secret.json', scope)
client = gspread.authorize(creds)

sheets = client.open('Slack_Bots').sheet1

Scraped = sheets.get_all_records()
print(Scraped)