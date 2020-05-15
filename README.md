<div align = "center">

<img height=200px src= "https://github.com/developer-student-club-thapar/officialWebsite/blob/master/Frontend/src/assets/dsc_logo.png">

<h1>DEVELOPER STUDENT CLUBS TIET</h1>

# Slack Bots
[![GitHub issues](https://img.shields.io/github/issues/developer-student-club-thapar/slack-bots?logo=github)](https://github.com/developer-student-club-thapar/slack-bots/issues)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
![GitHub repo size](https://img.shields.io/github/repo-size/developer-student-club-thapar/slack-bots)
<a> <img src="https://badgen.net/dependabot/thepracticaldev/dev.to?icon=dependabot" alt="Dependabot Badge"></a>

[![Pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/TezRomacH/python-package-template/blob/master/.pre-commit-config.yaml)
[![License](https://img.shields.io/github/license/TezRomacH/python-package-template)](hhttps://github.com/developer-student-club-thapar/slack-bots/blob/master/LICENSE)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

This repository contains various information retrieval bots for educational purposes. The bots are server and being currently used in DSC TIET Slack Channel and we serve the following information -
- Information about various hackathons
- Articles from Medium
- Articles from Dev.to
- Articles from Git Blogs

</div>

Installation and Setup
------------
### Setup and running of project (Backend)

- Fork the repo and clone it.
- Go in the repo and setup virtualenvironment using
  `python -m virtualenv env`
- Then activate the environment using
  `source env/Scripts/activate` (Use only `env/Scripts/activate` if on cmd or powershell)
- At the root of your project directory
```bash
 - pip install -r requirements.txt
 - pre-commit install
```
- This will setup the project requirements and pre-commit test hooks!

- After the above setup, run
```bash
 - python manage.py makemigrations
 - python manage.py migrate
```

- Start the backend server
  `python manage.py runserver`
  
**This runs the backend server at default port `8000`.
  Open [http://localhost:8000](http://localhost:8000) to view it in the browser.**<br />

### Setup and running of project (Frontend)

- At your root directory run `yarn install` to install all the dependencies
- To start react dev server `yarn start`

This runs the app in the development mode.<br />
**Open [http://localhost:3000](http://localhost:3000) to view it in the browser.**

The page will reload if you make edits.You will also see any lint errors in the console.<br />

Contribution to the project
------------
<div align="center">

[![GitHub issues](https://img.shields.io/github/issues/developer-student-club-thapar/slack-bots?logo=github)](https://github.com/developer-student-club-thapar/slack-bots/issues) ![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/developer-student-club-thapar/slack-bots?logo=git&logoColor=white) ![GitHub contributors](https://img.shields.io/github/contributors/developer-student-club-thapar/slack-bots?logo=github)

</div>
We follow a systematic Git Workflow -

- Create a fork of this repo.
- Clone your fork of your repo on your pc.
- [Add Upstream to your clone](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork)
- **Every change** that you do, it has to be on a branch. Commits on master would directly be closed.
- Make sure that before you create a new branch for new changes,[syncing with upstream](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork) is neccesary.

**Commits**
* Write clear meaningful git commit messages (Do read [this](http://chris.beams.io/posts/git-commit/)).
* Make sure your PR's description contains GitHub's special keyword references that automatically close the related issue when the PR is merged. (Check [this](https://github.com/blog/1506-closing-issues-via-pull-requests) for more info)
* When you make very very minor changes to a PR of yours (like for example fixing a failing Travis build or some small style corrections or minor changes requested by reviewers) make sure you squash your commits afterward so that you don't have an absurd number of commits for a very small fix. (Learn how to squash at [here](https://davidwalsh.name/squash-commits-git))
* When you're submitting a PR for a UI-related issue, it would be really awesome if you add a screenshot of your change or a link to a deployment where it can be tested out along with your PR. It makes it very easy for the reviewers and you'll also get reviews quicker.

#### Note

- If you are adding any new requirements for the project, make sure that you are adding it to `requirements.txt`
- Use only `yarn add package_name` to add new packages to the frontend part.

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
