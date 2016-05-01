var express = require('express')
var router = express.Router()
// var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/profile', function (req, res) {
  console.log('profile post received')
  console.log('req.body =', req.body)
  res.send(req.body.bodyFat, req.body.activityLvl, req.body.interest)
})

module.exports = router
