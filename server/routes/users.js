var express = require('express')
var router = express.Router()
var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
var Auth = require('../helpers/auth')
var User = require('../helpers/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.use(Auth.ifAuthorized)

router.post('/profile', function (req, res) {
  User.registerProfile(req.body.username, req.body.weight, req.body.bodyFat, req.body.activityLvl, req.body.interest, req.body.gym)
    .then(function () {
      res.send('profile updated')
    })
})

router.post('/picture', function (req, res) {
  var url = JSON.parse(req.body.url).url
  var username = req.body.username
  User.findUser(username)
    .then(function (data) {
      db('user').where({id: data[0].id}).update({image: url})
        .then(function (data) {
          res.json({
            success: true,
            data: data
          })
        })
    })
})

router.get('/profile', function (req, res) {
  User.getProfileInfo(req.query.username)
    .then(function (results) {
      res.send(results)
    })
})

module.exports = router
