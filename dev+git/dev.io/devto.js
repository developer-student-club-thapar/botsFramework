
const request = require('request');
const cheerio = require('cheerio');
let final='';
var URL = "https://dev.to/top/week";




request(URL, function (err, res, body) {
    if(err)
    {
        console.log(err);
    }
    else
    {
        let c=0
        let $ = cheerio.load(body);  //loading of complete HTML body 
        $('.single-article').each(function(index)
        {
            c=c+1;
            if(c<11)
            {

            const plink=$(this).find('.index-article-link').attr('href');
            const pcontent=$(this).find('.index-article-link').find('.content').find('h3').text();
            const tags = $(this).find('.tags').find('a').text();
            console.log(pcontent);
            console.log(`dev.to${plink}`);
            console.log(tags);
            console.log('------------------------------------------------------',c);
            }
        }
        );

    }
}); 