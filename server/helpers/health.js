var db = require('../db')
var Health = {}

Health.getLogs = function (userid) {
  return db('nutrition_record').select('*').where({user_id: userid})
}






module.exports = Health