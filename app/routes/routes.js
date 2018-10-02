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
	

	//for later: https://stackoverflow.com/questions/51785049/data-json-is-not-a-function-error

	app.post('/tweets', (req, res) => {

		//res.setHeader("Access-Control-Allow-Origin", "*");
		//const searchQuery = req.body.value
		
		//split the words and add spaces for better searching (only search for distinct words)
		//const searchWords = searchQuery.split(' ').map(word => ` ${word} `);
		//res.json('hi there')

		//TODO: run twitter search for each word, accumulating response object. if any search fails, respond to client immediately with error

		const results = {
			data: []
		}

		const searchTerms = ['hi', 'there']

		//res.json(results)
		//(err, data, response)

		Twitter.get('search/tweets', {q:'hi', count: 10}, function(err, data, response) {
				
				results.data = data
				
			}).then(()=>{
				res.setHeader("Access-Control-Allow-Origin", "*")
				res.json(results)
			})

		/*searchTwitter = async (word) =>{

			let resultsForThisWord = []

			Twitter.get('search/tweets', {q: 'hi', count: 10})
				.catch(function(err) {
					console.log(err)
				})
				.then(function(result){
					const texts = result.data.statuses.map((status)=>{
						resultsForThisWord.push(status.text)
					})
				})
		}*/

		
		
		
	

	})
}