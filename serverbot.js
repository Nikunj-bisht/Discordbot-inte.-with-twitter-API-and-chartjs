require('dotenv').config();
const Discord = require('discord.js');

// create instance of client class
const client = new Discord.Client();


client.on("message" , (message)=>{


    if(message.author.bot === true){
        return;
    }
    message.id.co
    const name = message.author.tag.split("#");
    
      if(name[1] === '8566'){

        message.reply('Hello leader!');

      }else{
          message.reply('lawde');
      }
    

});


client.login(process.env.DISCORD_BOTTOKEN);


