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
