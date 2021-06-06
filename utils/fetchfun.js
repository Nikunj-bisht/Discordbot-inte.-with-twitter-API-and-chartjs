const needle = require('needle');

exports.fetchid = async(fin) =>{


    

        const endpointURL = "https://api.twitter.com/2/users/by?usernames="

        const params = {

            usernames: `${fin}`, // Edit usernames to look up
            "user.fields": "created_at,entities,description,name,pinned_tweet_id,profile_image_url",
            // Edit optional query parameters here
            "expansions": "pinned_tweet_id"

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