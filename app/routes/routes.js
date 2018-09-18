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

		const searchQuery = req.body.body
		
		Twitter.get('search/tweets', {q: searchQuery, count: 1}, (err, data, response) =>{
			res.send(data);
		})


	})
}