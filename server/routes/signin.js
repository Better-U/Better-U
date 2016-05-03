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
  console.log('request inside login', req.body.username)
  User.findUser(req.body.username)
    .then(function (data) {
      console.log('find userid:', data)
      user = { id: data[0].id, username: req.body.username }
      if (data.length === 0) {
        res.json({exists: false})
      } else {
        User.comparePassword(req.body.username, req.body.password)
          .then(function (exists) {
            console.log('user exists', exists)
            if (exists) {
              res.json({
                success: true,
                message: 'Logged in!',
                token: Auth.genToken(user)
              })
            } else {
              res.json({passwordMatch: false})
            }
          })
      }
    })
})
// declare routes

module.exports = router
