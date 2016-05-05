var db = require('../db')
var Goals = {}

Goals.postLog = function (type, date, intensity, category, value, measurement, id) {
  var goalObj = {
    type: type,
    date: date,
    intensity: intensity,
    category: category,
    value: value,
    measurement: measurement,
    user_id: id
  }
  return db('goals').insert(goalObj)
}

Goals.getLog = function (userid) {
  return db('goals').select('*').where({user_id: userid})
}

Goals.deleteLog = function (id) {
  return db('goals').where({id: id}).del()
}

Goals.findLog = function (userid, type) {
  return db('goals').select('*').where({user_id: userid, category: type})
}

Goals.updateValue = function (id, currentValue) {
  return db('goals').where({id: id}).update({currentValue: currentValue})
}

module.exports = Goals
