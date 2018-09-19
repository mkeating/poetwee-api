//server.js

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 8000


//middleware to allow CORS
const cors = require('cors')

	app.use(cors())
	app.use(bodyParser.urlencoded({extended: true}))



require('./app/routes')(app)

app.listen(port, () => {
	console.log(`we are live on ${port}`)
})