
const request = require('request');
const cheerio = require('cheerio');
let final='';
var URL = "https://dev.to/top/week";

let c=0;
const rp = require('request-promise');


const fetchdevblogs=async(url)=>{

    const options = {
        uri: url,
        transform: function (body) {
          return cheerio.load(body);
        }
      };

      
 return rp(options)
  .then(($) => {
    const blocks = [];
    const divider=	{
        "type": "divider"
    };
    // console.log($);
    $('.single-article').each(function(index)
    {
        c=c+1;
        if(c<11)
        {

        const plink=$(this).find('.index-article-link').attr('href');
        const pcontent=$(this).find('.index-article-link').find('.content').find('h3').text();
        const tags = $(this).find('.tags').find('a').text();
        const reading =$(this).find('.article-reading-time').text();
        const likes=$(this).find('.reactions-count').find('.engagement-count-number').text().trim();
        const dates=$(this).find('time').text().trim();
        
        // console.log(typeof(tags));

        const context1=		{
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `*Reading-Time:* ${reading.trim()}`
            }
          ]
        }
        const context2=		{
          "type": "context",
          "elements": [
            {
              "type": "mrkdwn",
              "text": `*Date:* ${dates}`
            }
          ]
        }


        const block={
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": `*<${`dev.to${plink}`}|${pcontent.trim()}>*\n:hearts: ${likes} likes\n ${tags}`
          },
          "accessory": {
            "type": "image",
            "image_url": "https://camo.githubusercontent.com/5f7c1e90c653c16fb10a1607c6ebc0d067e3e377/68747470733a2f2f74686570726163746963616c6465762e73332e616d617a6f6e6177732e636f6d2f692f726f3335333862793362326675706273363373722e706e67",
            "alt_text": "alt text for image"
          }
        }

        blocks.push(block);
        blocks.push(context2);
        blocks.push(context1);
        blocks.push(divider);
        // console.log(pcontent);
        // console.log(`dev.to${plink}`);
        // console.log(tags);
        // console.log('------------------------------------------------------',c);
        final=`${final}${'\n'}${pcontent}${'\n'}${plink}${'\n'}${tags}${'\n'}------------${'\n'}`
        }
    }
    );

    return blocks;

  })
  .catch((err) => {
    console.log(err);
  });
}
module.exports=fetchdevblogs;
