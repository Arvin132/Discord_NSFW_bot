const Discord = require("discord.js");  
const config = require("./config.json")

const client = new Discord.Client({intents: [Discord.GatewayIntentBits.Guilds,
                                             Discord.GatewayIntentBits.GuildMessages,
                                             Discord.GatewayIntentBits.MessageContent]})

client.on('messageCreate', function(message) {
    if (message.author.bot || !message.content.startsWith(config.PREFIX)) {
        // if the message if from another bot or if doesn't have the prefix
        return;
    }

    var realMessage = message.content.substring(config.PREFIX.length);
    let tokens = realMessage.split(" ");
    command = tokens[0];
    if (command == "info") {
        var channel = client.channels.cache.get(message.channelId)
        channel.send("Hello My Name is Harambe, and i am a bot created to detect NSFW content")
        channel.send("I am in the process of development")
        channel.send()
    }
})

client.on("ready", () =>{ //message when bot is online
    console.log("Bot Deployed");
});



client.login(config.BOT_TOKEN)




