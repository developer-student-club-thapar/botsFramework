# Slack-Bots
This repository contains various Slack Bots for various purposes and information sharing in DSC TIET-GS Slack Channel

## Current goals for the project are:

3 different chat bots to be developed,

    1. For Hacathons, primarily from telegram. 
    2. Medium/ technical articles
    3. Recruitment of Hacathon teams

3 stages for the Bots are:

    1. Scraping using metadata
    2. Using Regex
    3. Applying NLP

## Runtime Instructions 

### Dev.to and GitHub Pages Bot
	First 5 steps of the execution of both dev.to and gitblog script are the same

	1.$ cd/scraperbot
	2.$ npm install 
	3.configure the value of the environment variable  SLACK_TOKEN 
	4.install the app to your workspace
	5.add the app to the channel in which you want to deploy the app
##### Dev.to

	6.now in dev.io/route.js add the following line at the end of code 
	  slackpost(<channel id>,<url from the given object>);
	  	  	<channel id>is the id of the channel of your workspace in whivh you want to deploy the bot
	  		<url> is the dev.to url from which you want to scrape the posts
	  for eg:-
	  slackpost('C012WCD3QF4',urlweek.webdev);

	7.now execute the script route.js using the command
		$node route.js
	8.Top 10 posts of the week related to the topic of the url will be posted on your channel

##### Github Blogs

	6.now in gitblog/gitroute.js add the following line at the end of code 
	  slackpost(<channel id>,`https://github.blog/category/community/open-source/`);
	  	  	<channel id>is the id of the channel of your workspace in whivh you want to deploy the bot
	  for eg:-
	  slackpost('C012WCD3QF4',`https://github.blog/category/community/open-source/`);

	7.now execute the script route.js using the command
		$node route.js
	8.The posts of the github blogs of that current day will be posted


### Telegram Bot

	1. 'Talk' to 'BotFather' in the Telegram app to create a new bot
	2. Use '/setprivacy' and 'Disable'. Now your bot can read all messages in the group
	3. Get your bot's token for BotFather using '/token' (eg: 888####:AA#############)
	4. Add you bot in the group chat and get chat id using the following steps:
		Assume the bot name is my_bot.

		1- Add the bot to the group.
		Go to the group, click on group name, click on Add members, in the searchbox search for your bot like this: @my_bot, select your bot and click add.

		2- Send a dummy message to the bot.
		You can use this example: /my_id @my_bot

		3- Go to following url: https://api.telegram.org/botXXX:YYYY/getUpdates
		replace XXX:YYYY with your bot token

		4- Look for "chat":{"id":-zzzzzzzzzz,
		-zzzzzzzzzz is your chat id (with the negative sign).
	5. Add your Chat ID and bot Token to Telegram/scrapper.py
