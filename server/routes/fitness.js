var express = require('express')
var router = express.Router()
var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
var User = require('../helpers/user')
var Auth = require('../helpers/auth')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/cardioForm', function (req, res) {
  var user = req.body.username
  User.findUser(user)
    .then(function (data) {
      var cardioForm = [{
        user_id: data[0].id,
        date: req.body.date,
        type: req.body.type,
        distance: req.body.distance,
        duration: req.body.duration,
        pace: req.body.pace,
        intensity: req.body.intensity
        }]
      db.insert(cardioForm).into('cardio_record').select('user_id', 'date', 'type', 'distance', 'duration', 'pace', 'intensity')
    .then(function (success) {
      if(success) {
        res.json({success: true})
      } else {
        res.json({success: false})
      }
    })
  })
})

module.exports = router
