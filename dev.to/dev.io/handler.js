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
const imagearray= [
    'https://s30776.pcdn.co/wp-content/uploads/2020/04/AdobeStock_305233591.jpeg',
    'https://edsurge.imgix.net/uploads/post/image/12176/coding-1556754232.jpg?auto=compress%2Cformat&w=2000&h=810&fit=crop',
    `https://d1gtq9mqg5x3oe.cloudfront.net/images/spcs/noncredit/programs/coding/coding-bootcamp/hero/coding-hero-720x240.jpg`,
    `https://miro.medium.com/max/1400/1*0bWyrYPQhqFF-_BGCE3WQg.jpeg`,
    `https://3ovyg21t17l11k49tk1oma21-wpengine.netdna-ssl.com/wp-content/uploads/2018/06/Cultivate-Community.jpg`,
    `https://stxnext.com/media/filer_public/13/84/13841949-9a68-42f7-98a8-2037bda88d3f/machine-learning-applications-header.png`,
    `https://zdnet2.cbsistatic.com/hub/i/2019/08/23/3ee727b6-3307-48cd-9f6f-77ac484c3b2b/ml.jpg`,
    `https://headspring.com/wp-content/uploads/2018/06/Build-Vs-Buy-Pt-1-Value-of-Custom-Software.jpg`,
    `https://www.goodcore.co.uk/blog/wp-content/uploads/2019/08/system-software.png`,
    `https://www.goodcore.co.uk/blog/wp-content/uploads/2019/08/programming-software.png`,
    `https://images.techhive.com/images/article/2017/05/internet_of_things-100720860-large.jpg`,
    `https://content-static.upwork.com/blog/uploads/sites/3/2019/06/11041941/11-Tips-to-Optimize-JavaScript-And-Improve-Website-Loading-and-Rendering-Speeds-feature.png`,
    `https://stackify.com/wp-content/uploads/2018/10/JavaScript-Tutorials-for-Beginners-881x441.jpg`,
    `https://mp4-a.udemycdn.com/2019-07-05_23-49-56-2e2baad57fe377f4adbde3666f108cac/thumb-1.jpg?CP39Js2L7zgp5xt3aVsaFpj1gK-gPxun_dfYSWJX3j1O4zQWDWdp_MLFWu5aNIkCBfXA8zAj3ow1akQmARoHqjJ8IIa8sdWonJz5tJKDZX9rtffte3JFTVplYUgY12EG22otlYHHkn4US8Wf3o25klBRP9HcfHJ-YoH9XqA3Fg`,
    `https://i1.wp.com/blog.logrocket.com/wp-content/uploads/2020/05/understanding-symbols-in-javascript.png?fit=730%2C487&ssl=1`,
    `https://minutes.co/wp-content/uploads/2019/04/shutterstock_323897318.png`,
    `http://1.bp.blogspot.com/-U6obw5PVicw/VjaUDPTNhwI/AAAAAAAABck/I5vqkKlexSo/s1600/particles.PNG`,
    `https://blog.hubspot.com/hubfs/html-css-javascript.jpg`,
    `https://www.ranorex.com/rx-media/rx-blog/header_tdd-experimental-programming.png`
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
      let noimg= Math.floor(Math.random()*6);
 return rp(options)
  .then(($) => {

    console.log('command shifted here fetchblog');
    const blocks = [];
    const divider=	{
        "type": "divider"
    };

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
            }

          }
          const imgblock={
            "type": "image",
            "title": {
              "type": "plain_text",
              "text": "Image",
              "emoji": true
            },
            "image_url": imagearray[noimg+c],
            "alt_text": "Example Image"
          }
          blocks.push(block);
          blocks.push(context2);
          blocks.push(context1);
          blocks.push(imgblock);
          blocks.push(divider);

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
