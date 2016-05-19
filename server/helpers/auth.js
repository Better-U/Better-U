require('dotenv').config()
var jwt = require('jsonwebtoken')

var secret = process.env.TOKEN_SECRET

var auth = {}

auth.Decode = function (token) {
  return jwt.decode(token)
}

auth.genToken = function (userDetails) {
  return jwt.sign({id: userDetails.id, username: userDetails.username}, secret, { expiresIn: 60000 })
}

auth.ifAuthorized = function (req, res, next) {
  var cookie = req.headers.cookie
  var regex = /token=(.*)/
  var matches = cookie.match(regex)

  var token = matches[1]

  if (token) {
    jwt.verify(token, secret, function (err) {
      if (err) {
        console.error('err')
        unauthorized(res)
      } else {
        next()
      }
    })
  } else {
    unauthorized(res)
  }
  function unauthorized (res) {
    res.sendStatus(401)
  }
}

module.exports = auth
