const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const axios = require('axios');
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async() => {
    console.log(`Bot is online`)
    bot.user.setActivity("type -help for help")
});

const upwd = botconfig.upwd;
const uemail = botconfig.uemail;
const streamableBaselinkVideo = "https://streamable.com/";

var urlImport = "https://api.streamable.com/import?url=";
var twlink = "https://www.twitch.tv/" + botconfig.twchannel + "/clip/"

bot.on("message", async message => {
  if(message.content.startsWith(botconfig.convert)){

    var convMsg = message.content.split(" ");

  if(convMsg[1].startsWith(twlink)) 
    clip = twClipify(convMsg[1]);
  else if(conv[1].startsWith("https://clips.twitch.tv/")) 
    clip = convMsg[1];
  else 
    return message.channel.send("nope chuck testa!");
    
    urlImport = urlImport + convMsg[1];

    axios.get(urlImport,{
      auth: {
        username: uemail,
        password: upwd
      }
    }).then((resp) => {
      message.channel.send( streamableBaselinkVideo + resp.data.shortcode);
    },(error) => {
      console.log(error);
    });
  }
  
  if(message.content.startsWith(botconfig.retrieve)){
    var retMsg = message.content.split(streamableBaselinkVideo)
    var urlExport = "https://api.streamable.com/videos/"
    urlExport = urlExport + retMsg[1];

    axios.get(urlExport,{
      auth: {
        username: uemail,
        password: upwd
      }
    }).then((resp) => {
      
      if(resp.data.title.length !== 0) 
        title = resp.data.title;
      else title = "twitch clip";

      const b = "https:";
      var img = b + resp.data.thumbnail_url;
      var url = b + resp.data.files.mp4.url;
      img
      const steamableEmbed = new Discord.RichEmbed()
                .setColor("#0F90FA")
                .setURL(url)
                .setTitle(title)
                .setImage(img)
                .setFooter("Streamable CDN" )
                .addField("source", resp.data.source)
      message.channel.send(steamableEmbed);
    },(error) => {
      console.log(error);
      return message.channel.send("error");
    });
  }

});

function twClipify(baselink){
    baselink.split(twlink);
    var clipbaselink = "https://clips.twitch.tv/";
    return clipbaselink + baselink[1];
}

bot.login(botconfig.token);