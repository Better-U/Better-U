var express = require('express')
var router = express.Router()
var app = express()
var bodyParser = require('body-parser')
var User = require('../helpers/user')
var Auth = require('../helpers/auth')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

router.post('/', function (req, res) {
  var user
  User.findUser(req.body.username)
    .then(function (data) {
      if (data.length === 0) {
        res.json({exists: false})
      } else {
        user = { id: data[0].id, username: req.body.username }
        User.comparePassword(req.body.username, req.body.password)
          .then(function (exists) {
            if (exists) {
              res.json({
                success: true,
                message: 'Logged in!',
                token: Auth.genToken(user)
              })
            } else {
              res.json({success: false})
            }
          })
      }
    })
})

module.exports = router
