var express = require('express')
var router = express.Router()
// var db = require('../db.js')
var Auth = require('../helpers/auth')

router.use(Auth.ifAuthorized)

var app = express()
var bodyParser = require('body-parser')
var User = require('../helpers/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/nutrition', function (req, res) {
  User.findUser(req.body.username)
  .then(function (id) {
   User.postFoodLog(id[0].id, req.body.name, req.body.date, req.body.time, req.body.serving, req.body.cal, req.body.carbs, req.body.fat, req.body.fiber, req.body.sodium, req.body.protein, req.body.water)
   .then(function () {
    res.send('Food Log inserted into DB.')
   })
  })
})

module.exports = router
