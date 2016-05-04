var db = require('../db.js')

Social = {}
Social.updateAddress = function (username, zipcode) {
  return db('user').where({username: username}).update({zipcode: zipcode})
}
Social.getUsersInZip = function (zipcode) {
  return db('user').where({zipcode: zipcode}).select('username')
}

module.exports = Social
