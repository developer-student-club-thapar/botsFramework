## Runtime Instructions 
	
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