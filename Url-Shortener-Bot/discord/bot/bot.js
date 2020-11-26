require("dotenv").config();
const { Client, MessageEmbed } = require("discord.js");

const client = new Client();

const { getShortURL } = require("./discord");

client.login(process.env.BOT_TOKEN);

const PREFIX = process.env.PREFIX;

client.on("ready", () => {
  console.log(`${client.user.tag} has logged in!`);
});

// -shorturl link expires 2 minutes domain dsctiet.in password test123 description []

client.on("message", async (message) => {
  if (!message.author.bot && message.content.toLowerCase().startsWith(PREFIX)) {
    const queries = message.content.split(" ");
    switch (queries[0]) {
      case PREFIX + "shortURL": {
        if (queries.length <= 1) {
          message.channel.send("Enter a link to shorten it!");
          message.react("😕");
          return;
        }
        try {
          const link = await getShortURL(queries.slice(1));
          message.channel.send(`Your short URL is: ${link}`);
          message.react("🚀");
        } catch (err) {
          message.channel.send(
            "There was some error! Please check the syntax by typing -help shortURL"
          );
          console.log(err);
        }
        break;
      }
      case PREFIX + "help": {
        if (queries[1].toLowerCase() === "shorturl") {
          const embed = new MessageEmbed()
            .setTitle("ShortURL")
            .setColor(0xff0000)
            .setDescription(
              'Fields:\n1) **target**- The url you want to short!\n2)**password**- Set password on the short URL\n3)**description**- The description of the url\n4)**domain**- "kutt.it"\n5)**expire_in**- The time you want to the link to retain\n-> Only target field is required field!\n->The order is a must!!'
            );
          message.channel.send(embed);
        }
        break;
      }
    }
  }
});
