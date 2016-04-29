var express = require('express')
var router = express.Router()
// var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/signup', function(req, res){
	console.log('signup post received')
	res.send(req.body.username, req.body.password)
})

module.exports = router
