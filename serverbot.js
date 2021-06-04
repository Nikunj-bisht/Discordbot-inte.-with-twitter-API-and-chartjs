
require('dotenv').config();
const express = require('express');
const app = express();
const Discord = require('discord.js');
const {message} = require('./messagefun/messagescmd');
// create instance of client class
const client = new Discord.Client();



app.get('/wake' ,(req,res)=>{



  client.on("message" , (mess)=>{
message(mess,Discord);
    

});

console.log("bot");
client.login(process.env.DISCORD_BOTTOKEN);

});

const port = process.env.PORT || 3000;
app.listen(port , () =>{
console.log("server started");

});




