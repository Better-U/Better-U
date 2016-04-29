var express = require('express')
var router = express.Router()
// var db = require('../db.js')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/', function (req, res) {
  // req.body.username and req.body.password hold info
  res.send(req.body)
})
module.exports = router
