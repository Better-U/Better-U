var express = require('express')
var router = express.Router()
// var db = require('../db.js')
var Auth = require('../helpers/auth')

router.use(Auth.ifAuthorized)


module.exports = router

