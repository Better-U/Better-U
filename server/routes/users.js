var express = require('express')
var router = express.Router()
// var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
var User = require('../helpers/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/profile', function (req, res) {
  console.log('profile post received')
  console.log('req.body =', req.body)
  localStorageID = req.body.id
  User.registerProfile(req.body.id, req.body.bodyFat, req.body.activityLvl, req.body.interest)
  .then(function () {
	res.send('profile updated')
  })
})

router.get('/profile', function (req, res) {
  console.log('inside get profile')
  console.log('req.query.id =', req.query.id);
  User.getProfileInfo(req.query.id)
  .then(function (results) {
    console.log('results after User.getProfile', results)
    res.send(results)
  })
})

module.exports = router
