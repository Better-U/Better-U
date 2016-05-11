var db = require('../db')
var Strength = {}

Strength.postForm = function (form) {
  return db.insert(form).into('strength_record')
}

Strength.getRecords = function (id) {
  return db.select('*').from('strength_record').where({'user_id': id})
}

module.exports = Strength
