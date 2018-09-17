//routes/routes.js


module.exports = function(app){
	app.post('/tweets', (req, res) => {

		const responseText = `You have sent me ${req.body.body}`
		res.send(responseText)
	})
}