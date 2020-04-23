// WARNING THIS CODE CONTAINS EMOJIS

//require apis and confi files used
const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const axios = require('axios');

// disable @everyone for this bot instance
const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async() => {
  //resoponse to see bot is alive
  console.log(`Bot is online`);
  //activty
  bot.user.setActivity("!submit + clip")
});

//Links and variables that don't change
const streamableBaselinkVideo = "https://streamable.com/";
const streamableApiImportLink = "https://api.streamable.com/import?url=";
const twChannelLink = "https://www.twitch.tv/" + botconfig.twchannel + "/clip/";
const twClipBaseLink = "https://clips.twitch.tv/";

//TODO handoff to worker thread
/**
 * main function
 * @returns void
 */

bot.on("message", async message => {
  //check if message starts with convert command
  if(message.content.startsWith(botconfig.convert)){

    //split message to recieve link
    var convMsg = message.content.split(" ");

    //if create clip.twitch.tv link form channel twitch clip
    if( ! (convMsg[1].startsWith(twChannelLink) || convMsg[1].startsWith(twClipBaseLink) ) ) {
      //uncomment chosen response

      //error message text
      //message.channel.send(botconfig.errormsg);
      
      //error message emoji
      message.react('❎');
      //return
      return;
    }

    //create api request link 
    var urlImport = streamableApiImportLink + filter(convMsg[1]);
    
    //api access via module axios
    axios.get(urlImport,{
      //auth to api via basic auth
      auth: {
        username: botconfig.uemail,
        password: botconfig.upwd
      }
    }).then((resp) => {
      //send message with stremable link back into the channel comment out if you don't want video sent as a response
      message.channel.send( streamableBaselinkVideo + resp.data.shortcode);
      //uncomment this if you prefer emoji response
      message.react('✅');
      return;
    // on error
    },(error) => {
      //print any errors to console (check logfiles regularly) and inform user
      console.log(error);
      message.reply(botconfig.criticalerror);
      return;
    });
  }
});

/**
 * clears url of after ? parameters
 * @param {string} url - input url 
 * @returns {string} sanatized url
 */
function filter(url){
  var clip;
  //after id filter
  if(url.includes('?')){
    var convMsg = url.split('?');
    clip = convMsg[0];
  }else{
    clip = url;
  }
  return clip;
}

//login bot into to discord api with auth token
bot.login(botconfig.token);