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



require('./app/routes')(app)

app.listen(port, () => {
	console.log(`we are live on ${port}`)
})