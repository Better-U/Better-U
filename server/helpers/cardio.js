var db = require('../db')
var Cardio = {}

Cardio.getRecords = function (id) {
  return db.select('*').from('cardio_record').where({'user_id': id})
}

module.exports = Cardio
