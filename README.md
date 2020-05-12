# Slack-Bots
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
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

	
### Dev.to
	1.$ cd/dev.to
	2.$ npm install 
	3.configure the value of the environment variable  SLACK_TOKENDEV
	4.install the app to your workspace
	5.add the app to the channel in which you want to deploy the app

	6.now in dev.io/route.js add the following line at the end of code 
	  slackpost(<channel id>,<url from the given object>);
	  	  	<channel id>is the id of the channel of your workspace in whivh you want to deploy the bot
	  		<url> is the dev.to url from which you want to scrape the posts
	  for eg:-
	  slackpost('C012WCD3QF4',urlweek.webdev);

	7.now execute the script route.js using the command
		$cd dev.io
		$node route.js
	8.Top 10 posts of the week related to the topic of the url will be posted on your channel

### Github Blogs
	1.$ cd/gitblog
	2.$ npm install 
	3.configure the value of the environment variable  SLACK_TOKENGIT
	4.install the app to your workspace
	5.add the app to the channel in which you want to deploy the app

	6.now in ./gitroute.js add the following line at the end of code 
	  slackpost(<channel id>,`https://github.blog/category/community/open-source/`);
	  	  	<channel id>is the id of the channel of your workspace in whivh you want to deploy the bot
	  for eg:-
	  slackpost('C012WCD3QF4',`https://github.blog/category/community/open-source/`);

	7.now execute the script gitroute.js using the command
		$node gitroute.js
	8.The posts of the github blogs of that current day will be posted



### Telegram Bot

	1. 'Talk' to 'BotFather' in the Telegram app to create a new bot
	2. Use '/setprivacy' and 'Disable'. Now your bot can read all messages in the group
	3. Get your bot's token for BotFather using '/token' (eg: 888####:AA#############)
	4. Add you bot in the group chat and get chat id using the following steps:
		Assume the bot name is my_bot.

		1- Add the bot to the group.
		Go to the group, click on group name, click on Add members, in the searchbox search for your 
		bot like this: @my_bot, select your bot and click add.

		2- Send a dummy message to the bot.
		You can use this example: /my_id @my_bot

		3- Go to following url: https://api.telegram.org/botXXX:YYYY/getUpdates
		replace XXX:YYYY with your bot token

		4- Look for "chat":{"id":-zzzzzzzzzz,
		-zzzzzzzzzz is your chat id (with the negative sign).
	5. Add your Chat ID and bot Token to Telegram/scrapper.py

## Contributors ✨

Thanks goes to these wonderful people for helping us with the project! :

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/akshit-mee"><img src="https://avatars3.githubusercontent.com/u/62721801?v=4" width="100px;" alt=""/><br /><sub><b>Akshit Gupta</b></sub></a><br /><a href="#infra-akshit-mee" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/developer-student-club-thapar/slack-bots/commits?author=akshit-mee" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/Saurav-Shrivastav"><img src="https://avatars1.githubusercontent.com/u/54510448?v=4" width="100px;" alt=""/><br /><sub><b>Saurav-Shrivastav</b></sub></a><br /><a href="#infra-Saurav-Shrivastav" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/developer-student-club-thapar/slack-bots/commits?author=Saurav-Shrivastav" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/specter25"><img src="https://avatars1.githubusercontent.com/u/56391382?v=4" width="100px;" alt=""/><br /><sub><b>Ujjwal Agarwal</b></sub></a><br /><a href="https://github.com/developer-student-club-thapar/slack-bots/commits?author=specter25" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
