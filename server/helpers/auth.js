require('dotenv').config()
var jwt = require('jsonwebtoken')

var secret = process.env.TOKEN_SECRET

var auth = {}
auth.Decode = function(token) {
  return jwt.decode(token)
}

auth.genToken = function(userDetails) {
  return jwt.sign({id: userDetails.id, username: userDetails.username}, secret, {
    expiresIn: 50000
  })
}

// middleware function for checking auth
auth.ifAuthorized = function (req, res, next) {
  var token = req.headers['x-access-token']
  var verify

  if (token) {
    jwt.verify(token, tokenSecret, function(err, decoded) {
      if (err) {
        unauthorized(res);
      } else {
        next();
      }
    })
  } else {
    unauthorized(res);
  }

  function unauthorized(res) {
    res.json({
      success: false,
      message: 'Your account is unauthorized (token missing or invalid).'
    })
  }
}

module.exports = auth