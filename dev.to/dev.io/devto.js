
const request = require('request');
const cheerio = require('cheerio');
let final='';
var URL = "https://dev.to/top/week";

let c=0;
const rp = require('request-promise');
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
    let noimg= Math.floor(Math.random()*6);
    $('.crayons-story').each(function(index)
    {
        c=c+1;
        if(c<11)
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
            "text": `*<${`https://dev.to${plink}`}|${pcontent.trim()}>*\n:hearts: ${likes} likes\n ${tags}`
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

    return blocks;

  })
  .catch((err) => {
    console.log(err);
  });
}
module.exports=fetchdevblogs;
