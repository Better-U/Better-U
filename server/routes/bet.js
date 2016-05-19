var express = require('express')
var router = express.Router()
var Auth = require('../helpers/auth')
var User = require('../helpers/user')
var Bets = require('../helpers/bet')
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
      Bets.getUserPoints(bettor)
        .then(function (bettorPts) {
          var betterPts = bettorPts[0][0].totalpts
          Bets.getUserPoints(user)
            .then(function (userPts) {
              var userPts = userPts[0][0].totalpts
              Bets.addBets(user, bettor, goals, userPts, betterPts)
                .then(function (data) {
                  res.json({
                    success: true
                  })
                })
            })
        })
    })
})

router.delete('/betDelete', function (req, res) {
  Bets.deleteBet(req.query.id)
    .then(function (data) {
      res.json({
        success: true,
        data: data
      })
    })
})

router.get('/searchBets', function (req, res) {
  User.findUser(req.query.username)
    .then(function (id) {
      var bettor = id[0].id
      Bets.searchBets(req.query.goals_id, bettor)
        .then(function (data) {
          res.json({
            success: true,
            data: data
          })
        })
    })
})

router.get('/bettor', function (req, res) {
  User.findUser(req.query.username)
    .then(function (id) {
      var bettorId = id[0].id
      Bets.getBets(bettorId)
        .then(function (data) {
          res.json({
            success: true,
            data: data
          })
        })
    })
})

module.exports = router
