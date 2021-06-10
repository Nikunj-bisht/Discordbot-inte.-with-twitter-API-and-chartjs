const needle = require('needle');
const commands = require('../commands');
const {fetchid} = require('../utils/fetchfun');
const quer = require('../ques');
const kurl = require('../khalimg/imgkhali');
const ytdl = require('ytdl-core');
var conn;
var dispatch;

exports.message =async (message, disco) => {

    if (message.author.bot === true) {
        return;
    }
    const name = message.author.tag.split("#");

    if (message.content.includes('$tweets')) {

        const endpointUrl = "https://api.twitter.com/2/tweets/search/recent";

        let fin = message.content.split(" ")[1];
        async function getdata() {

            const params = {

                'query': `${fin}`,
                'tweet.fields': 'author_id'

            }

            const res = await needle('get', endpointUrl, params, {
                headers: {
                    "User-Agent": "v2RecentSearchJS",
                    "authorization": `Bearer ${process.env.Twitter_bearer}`
                }
            });
            return res;

        }

        (async () => {

            const response = await getdata();
            var reso;
            response.body.data.forEach(e => {

                reso += e.text + /n/;

            })

            //  console.log(response.body);
            message.channel.send(reso);

        })();



    }

    else if(message.content.includes("$fol")){

        let fin = message.content.split(" ")[1];

         async function getlikedtweets(id){

          const url =   `https://api.twitter.com/2/users/${id}/liked_tweets`;

            
          const params = {
max_results : 5
        }
        const res = await needle('get', url, params, {
            headers: {
                "User-Agent": "v2UserLookupJS",
                "authorization": `Bearer ${process.env.Twitter_bearer}`
            }
        });
         
        return res;


         }

         (async ()=>{

            const response = await fetchid(fin);

 const dat = await getlikedtweets(response.body.data[0].id);

   console.log(dat.body.data);
let counter = 1;

    const embed = new disco.MessageEmbed();

    embed.setTitle("Here are liked tweets");
    embed.setTimestamp();
    embed.setThumbnail(response.body.data[0].profile_image_url);
    embed.setImage(response.body.data[0].profile_image_url);
    embed.setURL(response.body.data[0].profile_image_url);
    // console.log(alltweets.body.dat);
    dat.body.data.forEach(e => {
        embed.addField(`${counter++} tweet`, e.text);

    });
    //console.log(reso);
    //  console.log(response.body);

    message.channel.send(embed);


         })();



    }

    else if (message.content.includes('$user')) {

        let fin = message.content.split(" ")[1];



        async function gettweetswithids(id) {



            const endpointURL = `https://api.twitter.com/2/users/${id}/tweets`;

            const params = {

            }

            // this is the HTTP header that adds bearer token authentication
            const res = await needle('get', endpointURL, params, {
                headers: {
                    "User-Agent": "v2UserLookupJS",
                    "authorization": `Bearer ${process.env.Twitter_bearer}`
                }
            })
            return res;

        }


        (async () => {

            const response = await fetchid(fin);
            //console.log(response.body.data[0]);
            const alltweets = await gettweetswithids(response.body.data[0].id);
            //console.log(alltweets.body.data);

            var reso = [];
            let counter = 1;
            const embed = new disco.MessageEmbed();

            embed.setTitle("Here are your tweets");
            embed.setTimestamp();
            embed.setThumbnail(response.body.data[0].profile_image_url);
            embed.setImage(response.body.data[0].profile_image_url);
            embed.setURL(response.body.data[0].profile_image_url);
            // console.log(alltweets.body.dat);
            alltweets.body.data.forEach(e => {
                embed.addField(`Tweet ${counter++}`, e.text);

            });
            //console.log(reso);
            //  console.log(response.body);

            message.channel.send(embed);

        })();




    } else if (message.content.includes("!pappu")) {

        const embed = new disco.MessageEmbed()
            .setTitle("Here are the commands Master");


        commands.forEach(e => {

            embed.addField(e.cmd, e.fun);

        });

        message.channel.send(embed);

    }


    else if (message.content.includes("$roast")) {

        const name = message.content.split(" ");

        console.log(name);

    }else if(message.content.includes("!quiz")){
        

        const embed = new disco.MessageEmbed();

        embed.setTitle(quer[2].ques);
        embed.setTimestamp();
        // console.log(alltweets.body.dat);
        //console.log(reso);
        //  console.log(response.body);
const r = quer[2].reaction , opt = quer[2].options , rea = quer[2].res;

for(let i=0;i<r.length ; i++){

    embed.addField(r[i] , opt[i]);

}

const polltopic = await message.channel.send(embed);

for(let i=0;i<r.length;i++){
await polltopic.react(r[i]);
}

 // :1_: :2_: :3_: :4_: :5_: :p_number_6: :7_: :8_: :p_number_9: :10:

 
var filters = [];
for(let i=0;i<r.length;i++){
    const filter = (reaction, user) => reaction.emoji.name === r[i];
filters.push(filter);
}

var coll = [];
for(let i=0;i<r.length;i++){
    coll.push(polltopic.createReactionCollector(filters[i] , {time:20000}));



}
var map = new Map();
var ans = "";
for(let i=0;i<coll.length;i++){

    coll[i].on('collect' , (collect,user) => {
        message.channel.send(`${rea[i]} ${user.username}`);
        map.set(user.username , rea[i]);
        });

}

coll[0].on('end' , (collect , user) =>{

   for(let[key , value] of map){
       ans+=key + " ---> " + value+"\n";
   }
 message.channel.send("Poll ended");
    message.channel.send(ans);
    
    });
    




    }else if(message.content.includes("!khali")){


         const ma = new disco.MessageAttachment(kurl());
         message.channel.send(ma);

    }

    else if(message.content.includes("$joinkhali")){


conn = await message.member.voice.channel.join();

dispatch = conn.play(ytdl('https://www.youtube.com/watch?v=Uvj827SqHak', { filter: 'audioonly' }));

    }else if(message.content.includes("$khali")){

const co = message.content.split(" ")[1];

if(dispatch !== "undefined"){
    switch(co){

          

        case "nikal":
        dispatch.destroy();
        
        break;
        
        case "pause":
        dispatch.pause();
        break;
        
        case "resume":
        
        dispatch.resume();
        break;
        
                }
}
      

    }

    // else if (name[1] === '8566') {

    //     message.reply('Hello leader!');

    // } else {

    //     message.reply('lawde');

    // }



}