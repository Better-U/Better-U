var express = require('express')
var router = express.Router()
// var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
var User = require('../helpers/user')
var Auth = require('../helpers/auth')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/', function (req, res) {
  var user;
  console.log('inside post', req.body);
  // req.body.username, req.body.password
  User.findUser(req.body.username)
    .then(function (data) {
      
      user = {
        id: data[0].id,
        username: req.body.username
      }
      
      if (data.length === 0) {
        res.send('make an account!')
      } else {
        User.comparePassword(req.body.username, req.body.password)
          .then(function (exists) {
            if (exists) {
              res.json({
                success: true,
                message: 'Logged in!',
                token: Auth.genToken(user)
              })
            } else {
              res.send('YOU DONT EXIST')
            }
          })
      }
    })
})
// declare routes

module.exports = router
