const Discord = require('discord.js')
const client = new Discord.Client()


bot_secret_token = process.env.BOTTOKEN

client.on('ready', () => {
    console.log("Connected as " + client.user.tag)


    client.user.setActivity("with javascript" ,{type:"WATCHING"});

        var generalChannel = client.channels.cache.get('719398484284932130')
        // console.log(generalChannel)
        // Replace with known channel ID
        generalChannel.send("Hello, world!")  
    })




client.login(bot_secret_token)