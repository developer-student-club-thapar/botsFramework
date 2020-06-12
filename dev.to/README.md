<div align = "center">

<img height=200px src= "https://cdn.worldvectorlogo.com/logos/devto.svg">

</div>

<h1 align="center">Welcome to Devto bot 👋</h1>
<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/developer-student-club-thapar/slack-bots/tree/master/dev.to" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/specter25/slack-bots/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/developer-student-club-thapar/slack-bots/blob/master/LICENSE" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/github/license/specter25/Devto bot" />
  </a>
</p>

> A bot to scrape dev.to articles and render them to slack

### 🏠 [Homepage](https://github.com/developer-student-club-thapar/slack-bots/tree/master/dev.to)

## Install

```sh
npm install
```

## File structure

| Folder | File       | Description                                                                   |
| ------ | ---------- | ----------------------------------------------------------------------------- |
| bot    | bot.js     | webApi setup of slack bot to post messgage in the slack channel               |
| bot    | handler.js | eventsApi setup of the Slack bot which can be directly deployed to aws lambda |
| dev.io | devto.js   | scrapes dev.to articles                                                       |
| dev.io | route.js   | webApi setup of slack bot to post messgage in the slack channel               |

## Usage

    While creating the bot give it the follwing OAuth Bot Token Scopes
    1)app_mention:read
    2)channels:join
    3)channels:messages
    4)channels:read
    5)chat:write
    6)chat:write.public

#### WEB API setup to post the top messages of a week of a particular field . Can be deploy it using aws lambda .

```

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
	8.Top 10 posts of the week
```

### Event's Api setup to add interactivity features. Can be deploy it using aws lambda .

```
	1.$ cd/dev.to
	2.$ npm install
	3.configure the value of the environment variable SLACK_TOKENDEV and VERICICATION_TOKEN
	4.install the app to your workspace
	5.add the app to the channel in which you want to deploy the app
	6.this script can be directly deployed to aws lambda without any further changes to it
	7. deploy the script verify the request url in the your bot\'s event api in slack and give it required permissions(mainly app mention read)
	8. To go the channel to which the bot has been added and type '@<botname> hello' for the tutorial
	9. The events's api can't be tested locally it has to be deployed first
```

## Author

👤 **Ujjwal Agarwal**

- Github: [@specter25](https://github.com/specter25)
- LinkedIn: [@ujjwalagarwal](https://linkedin.com/in/agarwalujjwal012)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Ujjwal Agarwal](https://github.com/specter25).<br />
This project is [MIT](https://github.com/developer-student-club-thapar/slack-bots/blob/master/LICENSE) licensed.
