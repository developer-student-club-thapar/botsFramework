const Discord = require("discord.js");
const client = new Discord.Client();
const { fetchblogs, fetchblogsimages }  = require("./gitblog");

const bot_secret_token =  process.env.BOTDEVTOKEN;

const discordpost = (url= 'https://github.blog/', channel='757160073255714828') => {
    client.on("ready", () => {
      console.log("Connected as " + client.user.tag);
  
      client.user.setActivity("with javascript", { type: "WATCHING" });
  
      var generalChannel = client.channels.cache.get(channel);
  
      fetchblogs(url).then(async ({ blocks, arr }) => {
        console.log(blocks);
        for (let index = 0; index < blocks.length ; index++) {
          const element = arr[index];
          const image = await fetchblogsimages(element);
  
          if (blocks[index].image && image) {
            blocks[index].image = image;
            console.log(image);
          }
  
          const exampleEmbed = {
            color: 0x0099ff,
            title: blocks[index].pheading,
            url: `${blocks[index].plink}`,
            description: blocks[index].pdesc,
            // fields: [
            //   {
            //     name: blocks[index].reading,
            //     value: `${blocks[index].likes}   :heart:`,
            //   },
            // ],
            image: {
              url: blocks[index].image,
            },
            timestamp: new Date(),
            footer: {
              text: blocks[index].date,
            },
          };
  
          generalChannel.send({ embed: exampleEmbed });
        }
      });
    });
  };
  
  client.login(bot_secret_token);
  
  module.exports = discordpost;
  