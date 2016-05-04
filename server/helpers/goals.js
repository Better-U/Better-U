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

module.exports = Goals