
require('dotenv').config();
const express = require('express');
const app = express();
const Discord = require('discord.js');
const { message } = require('./messagefun/messagescmd');

// create instance of client class
const client = new Discord.Client();
const client2 = new Discord.Client({ ws: { intents: 'GUILD_PRESENCES' } });
const Webhook = new Discord.WebhookClient('851014931981402135', '8HilnWNLZhq9NmOFiMm-rIo7_BfswrvJBhP8EWQOSwdu9wIMqgK1xcrlDeQge5kpqo7n');

app.get('/wake', (req, res) => {

  client.on('ready', () => {
    client.user.setActivity("Porn", { type: 'WATCHING' });

  })

  client.on("message", (mess) => {
    // console.log('fir bot');
    // console.log(mess.author.id);
    message(mess, Discord);

  });


  client2.on('presenceUpdate', (old, newmem) => {



  })

  client2.on('userUpdate', (old, newu) => {

    if (old.username !== newu.username) {
      Webhook.send(`${newu.username} nice choice!`, {
        username: client2.user.username,
        avatarURL: client2.avatarURL
      });

    }


  });



  console.log("bot");
  client.login(process.env.DISCORD_BOTTOKEN);
  client2.login(process.env.DISCORD_BOTTOKEN);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server started");

});




