const { WebClient } = require("@slack/web-api");
const { fetchblogs, fetchblogsimages }  = require("./gitblog");

const token = process.env.SLACK_GITTOKEN;

const web = new WebClient(token);

const slackpost = async (channel, url) => {

  const conversationId = channel;

  (async () => {
    let res;

    fetchblogs(url).then(async ({ blocks, arr }) => {


      for (let index = 0; index < 5; index++) {
        const element = arr[index];
        const image = await fetchblogsimages(element);

        console.log(index * 5 + 5+ "th block");
        console.log(blocks[index * 5 + 5]);
        if (blocks[index * 5 + 5]["image_url"] && image) {
          blocks[index * 5 + 5]["image_url"] = image;
        }
      }

      res = await web.chat.postMessage({ channel: conversationId, blocks });
    });

  })();
};
module.exports = slackpost;
