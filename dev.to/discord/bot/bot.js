const Discord = require('discord.js')
const client = new Discord.Client()
const {fetchdevblogs , fetchdevblogsimages}=require('../dev.io/devto');


bot_secret_token = process.env.BOTDEVTOKEN



const discordpost = (url , channel)=>{
    client.on('ready', () => {
        console.log("Connected as " + client.user.tag)
    
    
        client.user.setActivity("with javascript" ,{type:"WATCHING"});
    
            var generalChannel = client.channels.cache.get(channel)
    
         fetchdevblogs(url).then(async ({blocks, arr})=>{
    
            for (let index = 0; index < 5; index++) {
                const element = arr[index];
                const image = await  fetchdevblogsimages(element);
    
                if(blocks[index].image && image)
                {
                    blocks[index].image = image
                    console.log(image)
                }
    
                const exampleEmbed = {
                    color: 0x0099ff,
                    title: blocks[index].pcontent,
                    url: `${blocks[index].plink}`,
                    description: blocks[index].tags,
                    fields: [
                        {
                            name: blocks[index].reading,
                            value: `${blocks[index].likes}   :heart:`,
                        },
                        
                    ],
                    image: {
                        url: blocks[index].image,
                    },
                    timestamp: new Date(),
                    footer: {
                        text: blocks[index].date,
                    },
                }
    
                generalChannel.send({ embed: exampleEmbed });
    
    
            }
             
    
    
            // res = await web.chat.postMessage({ channel: conversationId, blocks });
    
        });
    
    
    
    
    
            
        })
    
    
    
}



client.login(bot_secret_token)


module.exports = discordpost;