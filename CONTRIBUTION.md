# Welcome to the contributions of Slack-Bot project

## Setup of project
- Create a folder to keep env and clone of the repo.
- Go in the repo and setup virtualenvironment using <br>
```virtualenv -p python3.7 env``` 
- Then activate the environment using <br>
```env source/bin/activate```
- After that clone your fork in the same folder.
- Go in the main directory of the project and do the following to setup project <br>
```bash 
pip install -r requirements.txt
pre-commit install
```
- This will setup the project requirements and pre-commit test hooks!

## Project Directory structure
```bash
   your-folder
   |-env
   |-slack-bots
     |-requirements.txt
     |-.pre-commit-config.yml
```