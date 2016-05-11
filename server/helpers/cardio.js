var db = require('../db')
var Cardio = {}

Cardio.getRecords = function (id) {
  console.log('inside get records')
  return db.select('*').from('cardio_record').where({'user_id': id})
}

module.exports = Cardio
