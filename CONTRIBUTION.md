# Welcome to the contributions of Slack-Bot project

## Setup of project

- Create a folder to keep env and clone of the repo.
- Go in the repo and setup virtualenvironment using <br>
  `virtualenv -p python3.7 env`
- Then activate the environment using <br>
  `env source/bin/activate`
- After that clone your fork in the same folder.
- Go in the main directory of the project and do the following to setup project <br>

```bash
pip install -r requirements.txt
pre-commit install
```

- This will setup the project requirements and pre-commit test hooks!

#### Note

- If you are adding any new requirements for the project, make sure that you are adding it to `requirements.txt`

## Project Directory structure

```bash
   your-folder
   |-env
   |-slack-bots
     |-requirements.txt
     |-.pre-commit-config.yml
```

### To keep your fork master insync, use these -

- [Add Upstream to your clone](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/configuring-a-remote-for-a-fork)
- [Syncing with upstream](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/syncing-a-fork)
