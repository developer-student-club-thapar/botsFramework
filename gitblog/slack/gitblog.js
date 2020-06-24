const request = require("request");
const cheerio = require("cheerio");
let final = "";
var moment = require("moment");
moment().format();
const rp = require("request-promise");
let c = 0;


const imagearray = [
  `https://res.cloudinary.com/practicaldev/image/fetch/s--r4ufmV36--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/507txwsd96h40908yunu.png`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--j0Oq-v5L--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--OubmiFAB--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/aiyaelf1rroed1znn3d4.jpg`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--fveMiFKE--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--_F-dRS51--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/16j6bnj29gmx0eejdsuy.png`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--Yqli_sbS--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--l6trFpAr--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/heyd00lvp6suotl3sp30.png`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--cRdcm120--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/d7lbgx001ig05pscz9b2.jpg`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--Wxf53RB8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/n2rlhk6kom4qnc0btsbj.png`,
  `https://res.cloudinary.com/practicaldev/image/fetch/s--laLllAHw--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--mMWKJkd2--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/dxigx5y0mlbgjuuuhze6.png`,
];



const fetchblogs = async (url) => {
  let plink;
  let arr = [];
  const options = {
    uri: url,
    transform: function (body) {
      return cheerio.load(body);
    },
  };

  return rp(options)
    .then(($) => {
      // console.log($);
      let blocks = [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "*Hello,Todays daily blogs posted on the github are here , do give it a read*\n\n",
          },
        },
      ];
      const divider = {
        type: "divider",
      };

      blocks.push(divider);
      $(".post-item").each(function (index) {

        c = c + 1;
        const currentdate = Date.now();
        const date = $(this)
          .find(".post-item__date")
          .find("time")
          .attr("datetime");
        const datestr = $(this)
          .find(".post-item__date")
          .find("time")
          .text()
          .trim();
        const pheading = $(this).find(".post-item__title").find("a").text();
        plink = $(this).find(".post-item__title").find("a").attr("href");
        const pdesc = $(this).find(".post-item__excerpt").find("p").text();
        final = `${final}${"\n"}${date}   ${pheading}${"\n"}${plink}${"\n"}${pdesc}${"\n"}------------${"\n"}`;
        // moment(currentdate).format('YYYY-MM-DD')
        // if (moment(currentdate).format("YYYY-MM-DD") === date) {
          if (c < 7) {
          // console.log(date);
          // console.log(`title :${pheading}`);
          // console.log(`link:${plink}`);
          // console.log(`description :${pdesc}`);
          // console.log('------------------------------------------------------',);
          arr.push(`${plink}`);
          const block = {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*<${plink}|${pheading.trim()}>* \n ${pdesc}`,
            }
          };
          const context1 = {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `*Reading-Time:`,
              },
            ],
          };
          const context2 = {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `*Date:* ${datestr}`,
              },
            ],
          };

          const imgblock = {
            type: "image",
            title: {
              type: "plain_text",
              text: "Image",
              emoji: true,
            },
            image_url: imagearray[Math.floor(Math.random() * 7)],
            alt_text: "Example Image",
          };

          blocks.push(block);
          blocks.push(context2);
          blocks.push(context1);

          blocks.push(imgblock);
          blocks.push(divider);
        }
      });

      if (blocks.length == 2) {
        blocks = [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*Sorry no blogs were posted on git today*\n\n",
            },
          },
        ];
      }
      console.log(arr);
      return { blocks, arr };
    })
    .catch((err) => {
      console.log(err);
    });
};



const img = {};

const fetchblogsimages = async (url) => {
  const key = url;
  const options = {
    uri: url,
    transform: function (body) {
      return cheerio.load(body);
    },
  };

  return rp(options)
    .then(($) => {
      const imgurl = $(".post-featured__image").find("img").attr("src");

      return imgurl;
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { fetchblogs, fetchblogsimages };
