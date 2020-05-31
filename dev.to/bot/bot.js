const { WebClient } = require('@slack/web-api');
const {fetchdevblogs , fetchdevblogsimages}=require('../dev.io/devto');

require('dotenv').config()

const token = 'xoxb-701820055536-1134559224756-TrIOTpg9jNTj6zhNZgfdpKco' ;
    
const web = new WebClient(token);

const slackpost=async(channel,url)=>{


    const conversationId = channel;

    (async () => {
        let res;

     fetchdevblogs(url).then(async ({blocks, arr})=>{

        for (let index = 0; index < 5; index++) {
            const element = arr[index];
            const image = await  fetchdevblogsimages(element);

            console.log((index*5+3)  +'th block')
            console.log(blocks[(index*5+3)])
            if(blocks[index*5+3]["image_url"] && image)
            {
                blocks[index*5+3]["image_url"]=image
            }


        }
         


        res = await web.chat.postMessage({ channel: conversationId, blocks });

    });

})();


}
module.exports=slackpost;