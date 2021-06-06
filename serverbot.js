
require('dotenv').config();
const express = require('express');
const app = express();
const Discord = require('discord.js');
const {message} = require('./messagefun/messagescmd');
// create instance of client class
const client = new Discord.Client();
const client2 = new Discord.Client({ws : {intents : 'GUILD_PRESENCES'}});
const Webhook = new Discord.WebhookClient('851014931981402135' , '8HilnWNLZhq9NmOFiMm-rIo7_BfswrvJBhP8EWQOSwdu9wIMqgK1xcrlDeQge5kpqo7n');

app.get('/wake' ,(req,res)=>{



  client.on("message" , (mess)=>{
    console.log('fir bot');
message(mess,Discord);
    
});
client2.on('presenceUpdate' , (old , newmem) => {

// console.log(old , newmem);
const name = newmem.user.username;

if(typeof old === 'undefined'){

Webhook.send(`Bye ${name} we hope you enjoyed your stay!`,{
  username : client2.user.username

})
}
else{

  Webhook.send(`Welcom back ${name}  good to see you`,{
    username : client2.user.username
  
  })
}
// https://discord.com/api/webhooks/851014931981402135/8HilnWNLZhq9NmOFiMm-rIo7_BfswrvJBhP8EWQOSwdu9wIMqgK1xcrlDeQge5kpqo7n

// const cl = newmem.client;

// const channel = newmem.guild.channels;
// // console.log(channel.get(`${channel.guild.id}`));

// console.log(channel , name , cl);

//channel.send(`Welcome back ${name}`);
} )

client2.on('userUpdate' , (old , newu) =>{

  if(old.username !== newu.username){
    Webhook.send(`${newu.username} nice choice!` ,{
      username : client2.user.username,
      avatarURL : client2.avatarURL
      });
      
  }


});



console.log("bot");
client.login(process.env.DISCORD_BOTTOKEN);
client2.login(process.env.DISCORD_BOTTOKEN);
});

const port = process.env.PORT || 3000;
app.listen(port , () =>{
console.log("server started");

});




