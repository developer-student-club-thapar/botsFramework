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

## Usage

```sh
	
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
	8.Top 10 posts of the week 
	
```


## Author

👤 **Ujjwal Agarwal**

* Github: [@specter25](https://github.com/specter25)
* LinkedIn: [@ujjwalagarwal](https://linkedin.com/in/ujjwalagarwal)


## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Ujjwal Agarwal](https://github.com/specter25).<br />
This project is [MIT](https://github.com/developer-student-club-thapar/slack-bots/blob/master/LICENSE) licensed.

