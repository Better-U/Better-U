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
          var bettor_pts = bettorPts[0][0].totalpts
          Bets.getUserPoints(user)
            .then(function (userPts) {
              var user_pts = userPts[0][0].totalpts
              Bets.addBets(user, bettor, goals, user_pts, bettor_pts)
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
  console.log('req.query', req.query)
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
  console.log('inside bettor get request')
  User.findUser(req.query.username)
    .then(function (id) {
      var bettorId = id[0].id
      Bets.getBets(bettorId)
        .then(function (data) {
          console.log('inside select bettor points ____')
          res.json({
            success: true,
            data: data
          })
        })
    })
})

module.exports = router
