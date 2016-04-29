var express = require('express')
var router = express.Router()
// var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
var User = require('../helpers/user')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/', function (req, res) {
  // req.body.username, req.body.password
  User.findUser(req.body.username)
    .then(function(data){
    	if(data.length === 0 ){
    		res.send("make an account!")
    	} else {
    		User.comparePassword(req.body.username, req.body.password)
    		.then(function(exists){
    			if(exists){
    				res.send(exists);
    			} else {
    				res.send("YOU DONT EXIST")
    			}
    		})
    	}
    })

})
// declare routes

module.exports = router
