<div align = "center">


<img height=200px src= "https://github.blog/wp-content/uploads/2013/04/074d0b06-a5e3-11e2-8b7f-9f09eb2ddfae.jpg?resize=1234%2C701">



</div>


<h1 align="center">Welcome to GitBlog  bot 👋</h1>
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

> A bot to scrape gitblog articles and render them to slack

### 🏠 [Homepage](https://github.com/developer-student-club-thapar/slack-bots/tree/master/gitblog)

## Install

```sh
npm install
```

## Usage

```sh
	
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
	
```


## Author

👤 **Ujjwal Agarwal**

* Github: [@specter25](https://github.com/specter25)
* LinkedIn: [@ujjwalagarwal](https://linkedin.com/in/agarwalujjwal012)


## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2020 [Ujjwal Agarwal](https://github.com/specter25).<br />
This project is [MIT](https://github.com/developer-student-club-thapar/slack-bots/blob/master/LICENSE) licensed.

