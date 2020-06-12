
const request = require('request');
const cheerio = require('cheerio');
const fs=require('fs');
let final='';
var URL = "https://dev.to/top/week";
let arr={};
let c=0;
const path = require('path')
const rp = require('request-promise');


const imagearray= [
  `https://res.cloudinary.com/practicaldev/image/fetch/s--r4ufmV36--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/507txwsd96h40908yunu.png`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--j0Oq-v5L--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--OubmiFAB--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/aiyaelf1rroed1znn3d4.jpg`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--fveMiFKE--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--_F-dRS51--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/16j6bnj29gmx0eejdsuy.png`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--Yqli_sbS--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--l6trFpAr--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/heyd00lvp6suotl3sp30.png`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--cRdcm120--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/d7lbgx001ig05pscz9b2.jpg`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--Wxf53RB8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/n2rlhk6kom4qnc0btsbj.png`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--laLllAHw--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--mMWKJkd2--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/dxigx5y0mlbgjuuuhze6.png`,
  
  ]



const fetchdevblogs=async (url)=>{

  let plink;
  let arr=[]
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

    $('.crayons-story').each(async function (index)
    {
        c=c+1;
        if(c<7)
        {

        plink=$(this).find('.crayons-story__title').find('a').attr('href');
        const pcontent=$(this).find('.crayons-story__title').find('a').text();
        const tags = $(this).find('.crayons-story__tags').find('a').text();
        const reading =$(this).find('.crayons-story__save').find('small').text();
        const likes=$(this).find('.crayons-btn--icon-left').text().trim().substring(22,27).trim();
        console.log(likes);
        const dates=$(this).find('time').text().trim();

        arr.push(`${`https://dev.to${plink}`}`);


        const content = {
          plink : `${`https://dev.to${plink}`}`,
          tags,
          pcontent : `${pcontent.trim()}`,
          reading : `${reading.trim()}`,
          likes,
          dates,
          image:  imagearray[ Math.floor(Math.random()*7)]
        }

        blocks.push(content);

        final=`${final}${'\n'}${pcontent}${'\n'}${plink}${'\n'}${tags}${'\n'}------------${'\n'}`
        }

  
    }
    );

console.log(arr)
    return {blocks, arr};

  })
  .catch((err) => {
    console.log(err);
  });
}

const img={ }

const fetchdevblogsimages=async(url)=>{

  const key=url;
  const options = {
      uri: url,
      transform: function (body) {
        return cheerio.load(body);
      }
    };

    
return rp(options)
.then(($) => {



      const imgurl = $('section').find('.image-final').attr('src');

      return imgurl;


})
.catch((err) => {
  console.log(err);
});
}

module.exports= {fetchdevblogs, fetchdevblogsimages};
