var db = require('../db')
var Nutrition = {}

Nutrition.postFoodLog = function (id, name, date, time, serving, size, cal, carbs, fat, fiber, sodium, protein, water) {
  console.log('inside postFoodLog')
  var foodLog = {
    user_id: id,
    name: name,
    date: date,
    time: time,
    serving: serving,
    servingSize: size,
    cal: cal,
    carbs: carbs,
    fat: fat,
    fiber: fiber,
    sodium: sodium,
    protein: protein,
    water: water
  }
  return db('nutrition_record').insert(foodLog)
}

Nutrition.getRecord = function (id) {
  console.log('inside get records')
  return db.select('*').from('nutrition_record').where({'user_id': id})
}

module.exports = Nutrition
