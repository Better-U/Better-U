var express = require('express')
var router = express.Router()
var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
var User = require('../helpers/user')
var Strength = require('../helpers/strength')
var Cardio = require('../helpers/cardio')
var Auth = require('../helpers/auth')
var Goals = require('../helpers/goals')
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
      Strength.postForm(strengthForm)
        .then(function (success) {
          Goals.findLog(strengthForm[0].user_id, strengthForm[0].type)
            .then(function (data) {
              console.log(data)
              for (var i = 0; i < data.length; i++) {
                var currentVal = data[i].currentValue
                if (data[i].measurement === 'Sets') {
                  if (data[i].currentValue === null) {
                    currentVal = 0
                  }
                  currentVal += Number(strengthForm[0].sets)
                  Goals.updateValue(data[i].id, currentVal)
                    .then(function (data) {
                      console.log(data)
                    })
                } else if (data[i].measurement === 'Minutes') {
                  if (data[i].currentValue === null) {
                    currentVal = 0
                  }
                  currentVal += strengthForm[0].duration
                  Goals.updateValue(data[i].id, currentVal)
                    .then(function (data) {
                      console.log(data)
                    })
                } else if (data[i].measurement === 'Pounds') {
                  if (data[i].currentValue === null) {
                    currentVal = 0
                  }
                  currentVal += strengthForm[0].weight
                  Goals.updateValue(data[i].id, currentVal)
                    .then(function (data) {
                      console.log(data)
                    })
                } else if (data[i].measurement === 'Reps') {
                  if (data[i].currentValue === null) {
                    currentVal = 0
                  }
                  currentVal += strengthForm[0].reps
                  Goals.updateValue(data[i].id, currentVal)
                    .then(function (data) {
                      console.log(data)
                    })
                }
              }
            })
          res.json({success: true, data: data})
        })
    })
})

router.post('/getStrength', function (req, res) {
  var user = req.body.username
  User.findUser(user)
    .then(function (data) {
      Strength.getRecords(data[0].id)
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
        time: req.body.time,
        type: req.body.type,
        distance: req.body.distance,
        duration: req.body.duration,
        pace: req.body.pace,
        intensity: req.body.intensity
      }]
      db.insert(cardioForm).into('cardio_record').select('user_id', 'date', 'type', 'distance', 'duration', 'pace', 'intensity')
        .then(function (info) {
          console.log('cardioform', cardioForm[0])
          Goals.findLog(cardioForm[0].user_id, cardioForm[0].type)
            .then(function (data) {
              for (var i = 0; i < data.length; i++) {
                var currentVal = data[i].currentValue
                if (data[i].measurement === 'Miles') {
                  if (data[i].currentValue === null) {
                    currentVal = 0
                  }
                  currentVal += Number(cardioForm[0].distance)
                  Goals.updateValue(data[i].id, currentVal)
                    .then(function (data) {
                      console.log(data)
                    })
                } else if (data[i].measurement === 'Minutes') {
                  if (data[i].currentValue === null) {
                    currentVal = 0
                  }
                  currentVal += cardioForm[0].duration
                  Goals.updateValue(data[i].id, currentVal)
                    .then(function (data) {
                      console.log(data)
                    })
                }
              }
            })
          res.json({success: true, data: data})
        })
    })
})

router.get('/getCardio', function (req, res) {
  var user = req.query.username
  User.findUser(user)
    .then(function (data) {
      console.log(data)
      Cardio.getRecords(data[0].id)
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
