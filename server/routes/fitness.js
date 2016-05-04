var express = require('express')
var router = express.Router()
var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
var User = require('../helpers/user')
var Auth = require('../helpers/auth')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
router.use(Auth.ifAuthorized)

router.post('/strengthForm', function (req, res) {
  var user = req.body.username
  User.findUser(user)
    .then(function (data) {
      var strengthForm = [{
        user_id: data[0].id,
        date: req.body.date,
        type: req.body.type,
        sets: req.body.sets,
        intensity: req.body.intensity,
        duration: req.body.duration,
        weight: req.body.weight,
        reps: req.body.reps
      }]
      db.insert(strengthForm).into('strength_record').select('user_id', 'date', 'type', 'sets', 'intensity', 'duration', 'weight', 'reps')
      .then(function (success) {
        if (success) {
          res.status(201).json({success: true})
        } else {
          res.status(404).json({success: false})
        }
      })
    })
})

router.post('/getStrength', function (req, res) {
  var user = req.body.username
  User.findUser(user)
    .then(function (data) {
      db.select('*').from('strength_record').where({'strength_record.user_id': data[0].id})
        .then(function (success) {
          if (success) {
            res.status(201).send(success)
          } else {
            res.status(404).json({success: false})
          }
        })
    })
})


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
        if (success) {
          res.status(201).json({success: true})
        } else {
          res.status(404).json({success: false})
        }
      })
    })
})

router.post('/getCardio', function (req, res) {
  var user = req.body.username
  User.findUser(user)
    .then(function (data) {
      db.select('*').from('cardio_record').where({'cardio_record.user_id': data[0].id})
        .then(function (success) {
          if (success) {
            res.status(201).send(success)
          } else {
            res.status(404).json({success: false})
          }
        })

    })
})

module.exports = router
