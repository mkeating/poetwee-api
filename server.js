//server.js

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 8000


//middleware to allow CORS
const cors = require('cors')

app.use(cors())
app.options('*', cors());

/*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*')
    res.header("Access-Control-Allow-Credentials", true)
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json')
    next()
})*/
app.use(bodyParser.urlencoded({extended: true}))



const twit = require('twit')
const config = {
  consumer_key: 		process.env.twitConsumerKey,  
  consumer_secret: 		process.env.twitConsumerSecret,
  access_token: 		process.env.twitAccessToken,  
  access_token_secret: 	process.env.twitAccessTokenSecret,
  timeout_ms:           5*1000
}



const Twitter = new twit(config);

app.post('/tweets', (req, res) => {

	res.json({

		"msg": "hi, im testing what you're sending",
		"search term": req.body.value
	})
	//res.setHeader("Access-Control-Allow-Origin", "*");

	//const searchQuery = req.body.search
		
	//split the words and add spaces for better searching (only search for distinct words)
	//const searchWords = searchQuery.split(' ').map(word => ` ${word} `)
		
	//res.setHeader('Content-Type', 'application/json');
	/*Twitter.get('search/tweets', {q: searchQuery, count: 1}, (err, data, response) =>{
		

		res.json(data.statuses)
	})*/


})

/*
app.get('/hi', (req, res) => {
	res.send('hi!')
})
*/

//require('./app/routes')(app)

app.listen(port, () => {
	console.log(`we are live on ${port}`)
})