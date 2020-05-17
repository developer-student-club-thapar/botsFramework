<div align = "center">

<img height=200px src= "https://github.com/developer-student-club-thapar/officialWebsite/blob/master/Frontend/src/assets/dsc_logo.png">

<h1>DEVELOPER STUDENT CLUBS TIET</h1>

# Slack Bots
[![GitHub issues](https://img.shields.io/github/issues/developer-student-club-thapar/slack-bots?logo=github)](https://github.com/developer-student-club-thapar/slack-bots/issues)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
![GitHub repo size](https://img.shields.io/github/repo-size/developer-student-club-thapar/slack-bots)
<a> <img src="https://badgen.net/dependabot/thepracticaldev/dev.to?icon=dependabot" alt="Dependabot Badge"></a>

[![Pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/TezRomacH/python-package-template/blob/master/.pre-commit-config.yaml)
[![License](https://img.shields.io/github/license/developer-student-club-thapar/slack-bots)](hhttps://github.com/developer-student-club-thapar/slack-bots/blob/master/LICENSE)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

This repository contains various information retrieval bots for educational purposes. The bots are server and being currently used in DSC TIET Slack Channel and we serve the following information - </div>
- Information about various hackathons
- Articles from Medium
- Articles from Dev.to
- Articles from Git Blogs

Basic Layout of the repository
------------
- Every folder in the repo represents the code of the bot which intends to scrape the file.
- In that particular folder, you will find a README.md file, containing the instructions to run the project
- Apart from that README will also consist of helping you support the hosting of your bots (as done by DSC TIET)

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
