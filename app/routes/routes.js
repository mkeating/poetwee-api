//routes/routes.js
const twit = require('twit')
const config = {
  consumer_key: 		process.env.twitConsumerKey,  
  consumer_secret: 		process.env.twitConsumerSecret,
  access_token: 		process.env.twitAccessToken,  
  access_token_secret: 	process.env.twitAccessTokenSecret,
  timeout_ms:           5*1000
}



const Twitter = new twit(config);

module.exports = function(app){
	app.post('/tweets', (req, res) => {

		req.setHeader("Access-Control-Allow-Origin", "*");
		const searchQuery = req.body.value
		
		//split the words and add spaces for better searching (only search for distinct words)
		//const searchWords = searchQuery.split(' ').map(word => ` ${word} `);
		

		//TODO: run twitter search for each word, accumulating response object. if any search fails, respond to client immediately with error

		Twitter.get('search/tweets', {q: searchQuery, count: 10}, (err, data, response) =>{
			
			//console.log(data.statuses)

		}).then(response =>{
			res.json(response)
		})


	})
}