var express = require('express')
var router = express.Router()
var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt')
var User = require('../helpers/user')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var saltRounds = 10
router.post('/', function (req, res) {
  // req.body.username and req.body.password hold info

  User.findUser(req.body.username)
  .then(function(data){
  	if (data.length === 0){
  		User.hashPassword(req.body.password)
  		.then(function(hash){
  			User.insertUserPw(req.body.username, hash)
  			  .then(function(){
  			  	res.send('user added')
  			  })

  		})
  	} else {
  		res.send('You have an account')
  	}
  })

})




 



module.exports = router
