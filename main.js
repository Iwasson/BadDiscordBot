const Discord = require('discord.js')           //js library with commands for discord
const auth = require('./auth.json')             //auth tokens for logging into bot
const client = new Discord.Client()             //create a new discord client for the bot
//const mp3 = require('./INDEED!.mp3')

client.on('ready', () => {
    //CHANGE THIS TO WHAT CHANNEL YOU WANT TO HAVE THE BOT LISTEN TO
    console.log("Connected as " + client.user.tag);
    client.user.setActivity("Listening");
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) { return }
    if (receivedMessage.content.toLowerCase().includes('indeed')) { executeIndeed(receivedMessage) };
    if(receivedMessage.content.toLowerCase() == "show me spam") { exectueSpam(receivedMessage)};
    //sleep(1200);
    //receivedMessage.member.voice.channel.leave();
})

async function exectueSpam(message) {
    console.log("Spamming initiated");

    let user = message.author;
    //message.author.send("BOOP");

    while(1) {
        //console.log("spamming");
        await user.send("I AM SPAM GOD BOT!!!!!");
    }
}

async function executeIndeed(message) {
    console.log("indeed detected");

    if (!message.guild) return;

    if (message.member.voice.channel) {
        const connection = await message.member.voice.channel.join();

        const dispatcher = connection.play('indeed.mp3', {
            volume: 1,
        });
    } else {
        console.log('You need to join a voice channel first!');
        return;

    }
}

client.login(auth.token);