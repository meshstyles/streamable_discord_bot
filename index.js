const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const axios = require('axios');
const bot = new Discord.Client({ disableEveryone: true });

bot.on("ready", async () => {
    console.log(`Bot is online`)
    bot.user.setActivity("type -help for help")
});

const upwd = botconfig.upwd;
const uemail = botconfig.uemail;
const streamableBaselinkVideo = "https://streamable.com/";

var urlImport = "https://api.streamable.com/import?url=";
var urlExport = "https://api.streamable.com/videos/"

bot.on("message", async message => {
    if (message.content.startsWith(botconfig.convert)) {

        var convMsg = message.content.split(" ");

        urlImport = urlImport + convMsg[1];
        axios.get(urlImport, {
            auth: {
                username: uemail,
                password: upwd
            }
        }).then((resp) => {
            message.channel.send(streamableBaselinkVideo + resp.data.shortcode);
        }, (error) => {
            console.log(error);
        });
    }

    if (message.content.startsWith(botconfig.retrieve)) {
        var retMsg = message.content.split(streamableBaselinkVideo)
        console.log(retMsg[1]);
        urlExport = urlExport + retMsg[1];

        axios.get(urlExport, {
            auth: {
                username: uemail,
                password: upwd
            }
        }).then((resp) => {
            message.channel.send("https:" + resp.data.files.mp4.url);
        }, (error) => {
            console.error(error);
            // console.log(error);
        });
    }

});

bot.login(botconfig.token);