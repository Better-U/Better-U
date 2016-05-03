var express = require('express')
var app = express()
var router = express.Router()
var db = require('../db.js')
var helpers = require('../helpers/socialHelpers.js')
var bodyParser = require('body-parser')

var server = require('http').createServer(app)
var io = require('socket.io')(server)

io.on('connection', function(socket){
	socket.emit('pizza', {hello: "hello"})
})

router.post('/updateZip', function(req, res){
	helpers.updateAddress(req.body.id,req.body.zipcode)
	  .then(function(){
	  	  res.send('you have changed the zipcode')
	  })
})

router.post('/findPeople', function(req, res){
	helpers.getUsersInZip(req.body.zipcode)
	  .then(function(data){
	  	res.send(data)
	  })
})
module.exports = router
