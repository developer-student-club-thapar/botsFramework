const { WebClient } = require('@slack/web-api');
const fetchdevblogs=require('../dev.io/devto');
// An access token (from your Slack app or custom integration - xoxp, xoxb)
require('dotenv').config()

const token = process.env.SLACK_TOKENDEV ;
    
const web = new WebClient(token);

const slackpost=async(channel,url)=>{

    // This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
    const conversationId = channel;

    (async () => {
        let res;
     // See: https://api.slack.com/methods/chat.postMessage
     fetchdevblogs(url).then(async (final)=>{
        // console.log(final);
        res = await web.chat.postMessage({ channel: conversationId, blocks: final });

    });
     // `res` contains information about the posted message
    //  console.log('Message sent: ', res.ts);
})();


}
module.exports=slackpost;