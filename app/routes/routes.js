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

		//this works!
		/*Twitter.get('search/tweets', {q:'hi', count: 10})
			.catch(function(err){
				console.log(err.stack)
			})
			.then(function(result) {
				results.data = result.data
			})
			.then(function(){
				//res.setHeader("Access-Control-Allow-Origin", "*");
				res.json(results)
			})
			*/

		const results = {}

		const searchTerms = ['hi', 'there']

		//function that searches Twitter for a word, returning 10 results that contain that word
		searchTwitter = (word) => {

			//array that holds results (after cleaning)
			let thisWord = []

			//returns a Promise, so that we can use Promise.all() to run this for all search terms
			return new Promise( (resolve, reject) => {

				Twitter.get('search/tweets', {q: word, count:10})
					.catch(err =>{
						return {error: err.stack}
					})
					.then(result => {

						for(let status of result.data.statuses) {
							thisWord.push(status.text)
						}
						//resolve the promise with the accumulated tweets
						resolve(thisWord)
					})// end Twitter.get()
			}) //end promise
		} //end searchTwitter

		Promise.all(searchTerms.map(term => {
			return searchTwitter(term)
		}))
		.then(results => {
			res.json(results)
		})
	})
}