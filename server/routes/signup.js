var express = require('express')
var router = express.Router()
var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
var bcrypt = require('bcrypt')
var User = require('../helpers/user')
var Auth = require('../helpers/auth')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/regUser', function (req, res) {

  User.findUser(req.body.username)
    .then(function (data) {
      if (data.length === 0) {
        User.hashPassword(req.body.password)
          .then(function (hash) {
            User.insertUserPw(req.body.username, hash)
              .then(function () {
                res.send('user added')
              })
          })
      } else {
        res.json({exists: true})
      }
    })
})

router.post('/regProfile', function (req, res) {
  var user;

  User.findUser(req.body.username)
    .then(function (data) {
      console.log('data', data)
      user = {
        id: data[0].id,
        username: req.body.username
      }
      User.insertUserProfile(req.body.age, req.body.weight, req.body.height, req.body.gender, req.body.interest, req.body.gym, data[0].id)
        .then(function (data) {
          res.json({
            success: true,
            message: 'Logged in!',
            token: Auth.genToken(user)
          })
        })
    })
})


module.exports = router
