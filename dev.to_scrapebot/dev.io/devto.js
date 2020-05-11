
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
    // console.log($);
    $('.single-article').each(function(index)
    {
        c=c+1;
        if(c<11)
        {

        const plink=$(this).find('.index-article-link').attr('href');
        const pcontent=$(this).find('.index-article-link').find('.content').find('h3').text();
        const tags = $(this).find('.tags').find('a').text();
        // console.log(pcontent);
        // console.log(`dev.to${plink}`);
        // console.log(tags);
        // console.log('------------------------------------------------------',c);
        final=`${final}${'\n'}${pcontent}${'\n'}${plink}${'\n'}${tags}${'\n'}------------${'\n'}`
        }
    }
    );
                return final;

  })
  .catch((err) => {
    console.log(err);
  });
}
module.exports=fetchdevblogs;
