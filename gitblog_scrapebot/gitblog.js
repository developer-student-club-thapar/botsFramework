
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
    $('.post-item').each(function(index)
                {
                    const currentdate=Date.now()
                    const date = $(this).find('.post-item__date').find('time').attr('datetime');
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
                    
                });
                return final;

  })
  .catch((err) => {
    console.log(err);
  });
}
module.exports=fetchblogs;