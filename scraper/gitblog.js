const moment =require('moment')
const request = require('request');
const cheerio = require('cheerio');
let final='';
var URL = "https://github.blog/category/community/open-source/";

moment().format();


request(URL, function (err, res, body) {
    if(err)
    {
        console.log(err);
    }
    else
    {
        let c=0
        let $ = cheerio.load(body); //loading of complete HTML body 
        $('.post-item').each(function(index)
        {
            const currentdate=Date.now()
            const date = $(this).find('.post-item__date').find('time').attr('datetime');
            const pheading=$(this).find('.post-item__title').find('a').text();
            const plink=$(this).find('.post-item__title').find('a').attr('href');
            const pdesc=$(this).find('.post-item__excerpt').find('p').text();
            if(currentdate === date)
            {
                console.log(moment(currentdate).format('YYYY-MM-DD'));
                console.log(`title :${pheading}`);
                console.log(`link:${plink}`);
                console.log(`description :${pdesc}`);
                console.log('------------------------------------------------------',);
            }
        }
        );

    }
}); 