import gspread
from oauth2client.service_account import ServiceAccountCredentials
import pprint

scope=['https://spreadsheets.google.com/feeds',
        'https://www.googleapis.com/auth/drive']
creds = ServiceAccountCredentials.from_json_keyfile_name('Client_Secret.json', scope)
client = gspread.authorize(creds)

sheets = client.open('Slack_Bots').sheet1

pp = pprint.PrettyPrinter()
# Scraped = sheets.col_values(3)                          #Note the index starts from 1
# pp.pprint(Scraped)

def Add_to_Sheets(data,index = 2):
    for i in data:
        new_row = i
        sheets.insert_row(new_row, index)

def Prev_Time_Channel():
        Message_Data = []
        ULRs = sheets.col_values(2)
        Time_Stamp = sheets.col_values(4)
        Channel_ID = sheets.col_values(5)
        for i in range(1, len(Time_Stamp)):
                if Time_Stamp[i]:
                        Message_Data.append([Time_Stamp[i], Channel_ID[i], ULRs[i]])
        return Message_Data