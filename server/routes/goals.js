var express = require('express')
var router = express.Router()
var Auth = require('../helpers/auth')
var User = require('../helpers/user')
var Goals = require('../helpers/goals')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


router.use(Auth.ifAuthorized)

router.post('/cardio', function(req, res) {
  console.log(req.body)
  User.findUser(req.body.username)
    .then(function(id) {
      console.log('id', id)
      Goals.postLog(req.body.type, req.body.date, req.body.intensity, req.body.category, req.body.value, req.body.measurement, id[0].id)
        .then(function(data) {
          res.json({
            success: true,
            data: data
          })
        })
    })
})

router.post('/strength', function(req, res) {
  console.log(req.body)
  User.findUser(req.body.username)
    .then(function(id) {
      console.log('id', id)
      Goals.postLog(req.body.type, req.body.date, req.body.intensity, req.body.category, req.body.value, req.body.measurement, id[0].id)
        .then(function(data) {
          res.json({
            success: true,
            data: data
          })
        })
    })
})

router.post('/nutrition', function(req, res) {
  console.log(req.body)
  User.findUser(req.body.username)
    .then(function(id) {
      console.log('id', id)
      Goals.postLog(req.body.type, req.body.date, req.body.intensity, req.body.category, req.body.value, req.body.measurement, id[0].id)
        .then(function(data) {
          res.json({
            success: true,
            data: data
          })
        })
    })
})


module.exports = router
