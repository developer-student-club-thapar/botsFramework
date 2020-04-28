const request = require('request-promise');
// const cheerio = require('cheerio');
// const fs = require('fs');
const getTags = require('./route');
var moment = require('moment');
moment().format();

var tags = getTags();

const fetchBlogs = async (tag) => {
  try {
    let date = encodeURIComponent(moment().subtract(7, 'days').toISOString());

    let options = {
      method: 'GET',
      url: `https://dev.to/search/feed_content?per_page=15&page=0&tag=${tag}&sort_by=positive_reactions_count&sort_direction=desc&tag_names%5B%5D=${tag}&approved=&class_name=Article&published_at%5Bgte%5D=${date}`,
      headers: {
        Referer: `https://dev.to/t/${tag}/top/week`,
      },
    };
    const response = await request(options);
    const responseJson = await JSON.parse(response).result;
    return responseJson;
  } catch (e) {
    console.log(e);
  }
};
const getBlogs = async () => {
  var blogs = {};

  for (let key in tags) {
    let tag = tags[key];
    blogs[tag] = await await fetchBlogs(tag);
  }
  return blogs;
};

getBlogs().then((blogs) => {
  for (let key in blogs) {
    console.log(key);
    blogs[key].forEach((blog, i) => {
      let title = blog.title;
      let link = `https://dev.to/${blog.path}`;
      var tags = '';
      blog.tags.forEach((tag) => (tags = `${tags} #${tag.name}`));
      console.log(
        `${
          i + 1
        }================================================================================================================================================`
      );
      console.log(title);
      console.log(link);
      console.log(tags);
    });
  }
});
