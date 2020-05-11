
const request = require('request');
const cheerio = require('cheerio');
let final='';
// Moment.format();

const rp = require('request-promise');


const fetchblogs=async(url)=>{

    const options = {
        uri:url,
        transform: function (body) {
          return cheerio.load(body);
        }
      };

      
 return rp(options)
  .then(($) => {
    // console.log($);
    const blocks = [];
    const divider=	{
        "type": "divider"
    };
    $('.post-item').each(function(index)
                {
                    const currentdate=Date.now()
                    const date = $(this).find('.post-item__date').find('time').attr('datetime');
                    const datestr = $(this).find('.post-item__date').find('time').text().trim();
                    const pheading=$(this).find('.post-item__title').find('a').text();
                    const plink=$(this).find('.post-item__title').find('a').attr('href');
                    const pdesc=$(this).find('.post-item__excerpt').find('p').text();
                    final=`${final}${'\n'}${date}   ${pheading}${'\n'}${plink}${'\n'}${pdesc}${'\n'}------------${'\n'}`
                    // if(moment(currentdate).format('YYYY-MM-DD') === date)
                    // {
                        // console.log(moment(currentdate).format('YYYY-MM-DD'));
                        // console.log(`title :${pheading}`);
                        // console.log(`link:${plink}`);
                        // console.log(`description :${pdesc}`);
                        // console.log('------------------------------------------------------',);
                    // }
                    const block={
                      "type": "section",
                      "text": {
                        "type": "mrkdwn",
                        "text": `*<${plink}|${pheading.trim()}>* \n ${pdesc}`
                      },
                      "accessory": {
                        "type": "image",
                        "image_url": "http://pngimg.com/uploads/github/github_PNG40.png",
                        "alt_text": "alt text for image"
                      }
                    }
                    const context2=		{
                      "type": "context",
                      "elements": [
                        {
                          "type": "mrkdwn",
                          "text": `*Date:* ${datestr}`
                        }
                      ]
                    }
                    blocks.push(block);
                    blocks.push(context2);
                    blocks.push(divider);
                    
                });
                return blocks;

  })
  .catch((err) => {
    console.log(err);
  });
}
module.exports=fetchblogs;