var express = require('express')
var router = express.Router()
var db = require('../db.js')
var Auth = require('../helpers/auth')
var Nutrition = require('../helpers/nutrition')
var Health = require('../helpers/health')

router.use(Auth.ifAuthorized)

var app = express()
var bodyParser = require('body-parser')
var User = require('../helpers/user')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/nutrition', function (req, res) {
  User.findUser(req.body.username)
    .then(function (id) {
      Nutrition.postFoodLog(id[0].id, req.body.name, req.body.date, req.body.time, req.body.serving, req.body.cal, req.body.carbs, req.body.fat, req.body.fiber, req.body.sodium, req.body.protein, req.body.water)
        .then(function () {
          res.send('Food Log inserted into DB.')
        })
    })
})

router.get('/nutrition', function (req, res) {
  var user = req.query.username
  User.findUser(user)
  .then(function (data) {
    console.log('get Nutrition data =', data)
    Nutrition.getRecord(data[0].id)
    .then(function (success) {
      if (success) {
        res.status(201).send(success)
      } else {
        res.status(404).json({success: false})
      }
    })
  })
})

//
// router.get('/fatSum', function(req, res) {
//   console.log(req.query.date)
//   // db('nutrition_record').sum('fat').where({date: req.query.date})
//     db('nutrition_record').select('date').where({fat: 17})
//     .then(function(data) {
//     console.log('this is data for sum', data)
//   })
//
// })

module.exports = router
