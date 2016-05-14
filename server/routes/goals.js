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

router.get('/', function (req, res) {
  User.findUser(req.query.username)
    .then(function (id) {
      Goals.getLog(id[0].id)
        .then(function (data) {
          res.json({
            success: true,
            data: data
          })
        })
    })
})

router.get('/bets', function (req, res) {
  console.log('this is req query: ', req.query)
  // User.findUser(req.query.username)
  //   .then(function (data) {
  //     var userId = data[0].id
      Goals.getBets(req.query.goals_id)
        .then(function (data) {
          res.json({
            success: true,
            data: data
          })
        })
    // })
})

router.post('/', function (req, res) {
  console.log(req.body)
  User.findUser(req.body.username)
    .then(function (id) {
      console.log('id', id)
      console.log('points', req.body.points)
      Goals.postLog(req.body.type,
        req.body.date,
        req.body.intensity,
        req.body.category,
        req.body.value,
        req.body.measurement,
        id[0].id,
        req.body.points)
        .then(function (data) {
          res.json({
            success: true,
            data: data
          })
        })
    })
})

router.delete('/', function (req, res) {
  console.log('req.query', req.query)
  Goals.deleteLog(req.query.id)
    .then(function (data) {
      res.json({
        success: true,
        data: data
      })
    })
})

module.exports = router
