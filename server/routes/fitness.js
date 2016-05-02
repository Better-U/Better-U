var express = require('express')
var router = express.Router()
// var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
var User = require('../helpers/user')
var Auth = require('../helpers/auth')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/cardioForm', function (req, res) {
  console.log('this is req.body: ', req.body)
  var user = req.body.username
  var cardioForm = {
    date: req.body.date,
    type: req.body.type,
    distance: req.body.distance,
    duration: req.body.duration,
    pace: req.body.pace,
    intensity: req.body.intensity
  }
  User.findUser(user)
    .then(function (data) {
      console.log('this is user data: ', data)
      // db('user').insert()
    })
})

module.exports = router
