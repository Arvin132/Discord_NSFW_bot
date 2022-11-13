const Discord = require("discord.js");  
const config = require("./config.json")
const fs = require("fs")
let setChannels = require("./setChannels.json")

const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds,
                                             Discord.GatewayIntentBits.GuildMessages,
                                             Discord.GatewayIntentBits.MessageContent]})
//for command messages
client.on('messageCreate', async function(message) {
    if (message.author.bot || !message.content.startsWith(config.PREFIX)) {
        // if the message if from another bot or if doesn't have the prefix
        return;
    }


    let realMessage = message.content.substring(config.PREFIX.length);
    let tokens = realMessage.split(" ");
    let command = tokens.at(0);
    tokens.splice(0,1)
    let channel = client.channels.cache.get(message.channelId)
    // below are the commands that can be given to the bot
    if (command == "info") {
        channel.send("Hello My Name is Harambe, and i am a bot created to detect NSFW content")
        channel.send("I am in the process of development")
        channel.send("https://github.com/Arvin132/Discord_NSFW_bot")
    }

    if (command == "set") {
        let allChannels = [client.channels.cache.at(0)];
        let CHANNELS = [""]
        CHANNELS.pop()
        allChannels.pop()
        client.channels.cache.each(canal => allChannels.push(canal))

        tokens.forEach(token => {
            let found = false
            allChannels.forEach(chan => {
                if (chan.name == token) {
                    CHANNELS.push(chan.id)
                    found = true
                }
            })

            if (!found) {
                message.reply(token +" is not a valid channel")
            }
        })

        setChannels = CHANNELS
        
        fs.writeFile("./setChannels.json", JSON.stringify(CHANNELS), err => {
            if (err) {
                console.log('Error writing file', err)
            } else {
                console.log('Successfully wrote file')
            }
        })

        message.reply("The channels below are set for detection:")
        let data  = ""
        CHANNELS.forEach(str => {
            client.channels.cache.forEach(chn => {
                if (chn.id == str) {
                    data += chn.name + ", "
                    
                }
            })
        });
        data = data.slice(0, -2)
        channel.send(data)
    }

    // later 
    // if (command == "report") {
    //     const repliedTo = await message.channel.messages.fetch("1036763685642842112");
    //     console.log(repliedTo.MessageContent);
    // }
})

client.on("messageCreate", function(message) {
    if (message.attachments.size > 0 && setChannels.includes(message.channelId)) { // the message has an attachment
        message.attachments.each(attachment => {
            console.log(attachment.url)
        })
    }
})



client.on("ready", () =>{ //message when bot is online
    console.log("Bot Deployed");
});


try {
    client.login(config.BOT_TOKEN)
} catch {
    console.log("Ops... check your bot token")
}




