const needle = require('needle');
const commands = require('../commands');
const {fetchid} = require('../utils/fetchfun');


exports.message = (message, disco) => {

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

    }else if(message){
        
    }

    // else if (name[1] === '8566') {

    //     message.reply('Hello leader!');

    // } else {

    //     message.reply('lawde');

    // }



}