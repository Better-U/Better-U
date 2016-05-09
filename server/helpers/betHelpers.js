var db = require('../db')
var bet = {}

bet.getAllPoints = function () {
  console.log('inside bet helpers - get all points')
  return db.raw('SELECT * FROM user ORDER BY totalpts DESC LIMIT 5')
}

bet.fetchBets = function (id) {
  var fetchBet = 'SELECT goals.intensity, goals.category, goals.value, goals.measurement, goals.date, goals.points, user.username FROM goals ' +
  'INNER JOIN bets ON goals.id = bets.goals_id ' +
  'INNER JOIN user ON user.id = bets.bettor_id ' +
  'WHERE bets.user_id = ?'
  console.log('this is fetchBets userID: ', id)
  return db.raw(fetchBet, [id])
}

bet.getUsername = function (id) {
  return db.select('username').from('user').where({'id': id})
}

bet.addBet = function (id, bet_id, goals_id) {
  var betObj = {
    user_id: id,
    bettor_id: bet_id,
    goals_id: goals_id
  }
  return db.insert(betObj).into('bets')
}

bet.deleteBet = function () {
  // 'DELETE FROM Friends WHERE Bets.user_id = ? AND Bets.bettor_id = ? AND Bets.goals_id = ?'
}

module.exports = bet
