var express = require('express')
var router = express.Router()
var Auth = require('../helpers/auth')
var User = require('../helpers/user')
var Bets = require('../helpers/betHelpers')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.use(Auth.ifAuthorized)

router.get('/getAllPoints', function (req, res) {
  Bets.getAllPoints()
    .then(function (data) {
      res.json({
        success: true,
        data: data
      })
    })
})

router.get('/placedBets', function (req, res) {
  User.findUser(req.query.username)
    .then(function (id) {
      var user = id[0].id
      Bets.placedBets(user)
        .then(function (data) {
          console.log('Placed Bets: ', data)
          res.json({
            success: true,
            data: data
          })
        })
    })
})

router.get('/fetchBets', function (req, res) {
  User.findUser(req.query.username)
    .then(function (id) {
      var user = id[0].id
      Bets.fetchBets(user)
        .then(function (data) {
          console.log('fetch user bets: ', data)
          res.json({
            success: true,
            data: data
          })
        })
    })
})

router.post('/addBets', function (req, res) {
  var goals = req.body.goals_id
  var user = req.body.user_id
  User.findUser(req.body.username)
    .then(function (id) {
      var bettor = id[0].id
      Bets.addBets(user, bettor, goals)
        .then(function () {
          res.json({
            success: true
          })
          console.log('Bet Added in server!')
        })
    })
})

router.delete('/betDelete', function (req, res) {
  console.log('req.query', req.query)
  Bets.deleteBet(req.query.id)
    .then(function (data) {
      res.json({
        success: true,
        data: data
      })
    })
})

module.exports = router
