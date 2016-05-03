var express = require('express')
var router = express.Router()
// var db = require('../db.js')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var Auth = require('../helpers/auth')
router.use(Auth.ifAuthorized)

module.exports = router
