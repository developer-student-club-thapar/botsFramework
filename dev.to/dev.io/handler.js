'use strict';

const request = require('request');

const cheerio = require('cheerio');
let final='';
var moment = require('moment');
moment().format();
const rp = require('request-promise');

const { WebClient } = require('@slack/web-api');

const token = process.env.SLACK_TOKENDEV;
    
const web = new WebClient(token);

const helloblocks=[
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "Hey there 👋 I'm DEVBot. I'm here to help you fetch articles from DEV.to directly to Slack.", 
        },
    },
    {"type": "divider"},
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "*1️⃣ `Tag` command*. Type `@Devbot Tag = <name of tag> number <number of articles>` \n. Try it out by using the command in this channel.\nExample - `@Devbot Tag = react number 2`",  
        },
    },
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "*Some tag sugggestions are *. react , python , javascript , webdev , blockchain , career , css , node , productivity , devops , go , ai , ux , ionic , firebase etc.",  
        },
    },
    
    {"type": "divider"},
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": "➕ To start searching, *add me to a channel* and I'll introduce myself. ",
        },
    },
]

const falseblocks=[
    {"type": "divider"},
    {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text":`Sir/Madam, I don't understand what you need. Type  *@Devbot Hello * for the tutorial`, 
        },
    },
    {"type": "divider"},

]



// function to split a message

function parseMessage( message )
{
    return message.split( ' ', 2 ).pop();
}

//function verufy call
function verifyCall( data )
{
    if ( data.token === process.env.VERICICATION_TOKEN ) 
    {
        return data.challenge;
    }
    else {
        throw 'Verification failed';
    }
}


//function slack post to post normal messages that don't require the integration of fetchblog function
const slackpost=(channel,message,callback)=>{
    console.log('entered slackpost')
    // This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
    const conversationId = channel;

    (async () => {
        let res;
     // See: https://api.slack.com/methods/chat.postMessage
     fetchblogs("react",5).then(async (final)=>{
        // console.log(final);
        res = await web.chat.postMessage({ channel: conversationId, blocks:message});
        callback(null, {
            statusCode: 200,
            body: res.ts
          }
          )
    });

})();
}

//function that posts messages to the messages that involve the blogs
const slackpostblog=(channel,tag,number , callback)=>{
    console.log('entered slackpost')
    // This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
    const conversationId = channel;

    (async () => {
        let res;

     fetchblogs(tag,number).then(async (final)=>{

        res = await web.chat.postMessage({ channel: conversationId, blocks: final ,text:"hello"});
        callback(null, {
            statusCode: 200,
            body: res.ts
          }
          )
    });

})();


}



module.exports.hello = (data , context, callback ) => 
{
    const dataObject = JSON.parse( data.body );
    console.log(dataObject)
    let response = {
        statusCode: 200,
        body      : {},
        headers   : { 'X-Slack-No-Retry': 1 }
    };

    try {
        if ( !( 'X-Slack-Retry-Num' in data.headers ) )
        {

            if( dataObject.type === 'url_verification' ) 
            {
                    response.body = verifyCall( dataObject ); 
            }
            else if (dataObject.type === 'event_callback')
            {
                const message = dataObject.event 
                if ( !message.bot_id )
                {
                    // Gets the command from the message
                    let command = parseMessage( message.text );
                    // Executes differend commands based in the specified instruction
                    console.log(command)
                    if(command === 'Hello' || command === 'hello' || command === 'hi') 
                    {
                        slackpost( message.channel,helloblocks,callback );
                    }
                    else if(command === 'Tag' )    
                    { 
                        const tag=message.text.split( ' ',4).pop();
                        console.log('Entered Tag')
                        const number = parseInt((message.text.split( ' ',6).pop()) , 10);
                        slackpostblog( message.channel,tag,number,callback);
                    }
                    else
                    {
                        slackpost( message.channel, falseblocks, callback );
                    }
                } // end of message bot.id if

            } // end of else oif of event_callback
            else
            {
                    response.statusCode = 400,
                    response.body = 'Empty request';
            }
        }//end of outer if of header check 
    }//end of try block
    catch( err ) 
    {
        response.statusCode = 500,
        response.body = JSON.stringify( err )
    } 
    finally 
    {
        callback(null ,response)
    }   
}




function fetchblogs(tag , number=5)
{
    console.log('command shifted here fetchblog');
    const options = {
        uri:`https://dev.to/t/${tag}/top/week`,
        transform: function (body) {
          return cheerio.load(body);
        }
      };

      let c=0;
 return rp(options)
  .then(($) => {
    // console.log($);
    console.log('command shifted here fetchblog');
    const blocks = [];
    const divider=	{
        "type": "divider"
    };
    // console.log($);
    $('.crayons-story').each(function(index)
    {
        c=c+1;
        if(c<number+1)
        {

          const plink=$(this).find('.crayons-story__title').find('a').attr('href');
          const pcontent=$(this).find('.crayons-story__title').find('a').text();
          const tags = $(this).find('.crayons-story__tags').find('a').text();
          const reading =$(this).find('.crayons-story__save').find('small').text();
          const likes=$(this).find('.crayons-btn--icon-left').text().trim().substring(22,27).trim();
          console.log(likes);
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
            "text": `*<${`https://dev.to${plink}`}|${pcontent.trim()}>*\n:hearts: ${likes} likes\n ${tags}`
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
    console.log(blocks)
    return blocks;

  })
  .catch((err) => {
    console.log(err);
  });
}
