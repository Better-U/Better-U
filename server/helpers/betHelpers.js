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
  return db.raw(fetchBet, [id])
}

bet.addBets = function (id, bet_id, goals_id, user_pts, bettor_pts) {
  var betObj = {
    user_id: id,
    bettor_id: bet_id,
    goals_id: goals_id,
    user_pts: user_pts,
    bettor_pts: bettor_pts
  }
  return db.insert(betObj).into('bets')
}

bet.placedBets = function (id) {
  var placedBet = 'SELECT goals.intensity, goals.category, goals.value, goals.measurement, goals.date, goals.points, user.username FROM goals ' +
    'INNER JOIN bets ON goals.id = bets.goals_id ' +
    'INNER JOIN user ON user.id = bets.user_id ' +
    'WHERE bets.bettor_id = ?'
  return db.raw(placedBet, [id])
}

bet.searchBets = function (goals_id, id) {
  var checkBet = 'SELECT * FROM bets WHERE goals_id = ? AND bettor_id = ?'
  return db.raw(checkBet, [goals_id, id])
}

bet.getUserPoints = function (id) {
  var getPoints = 'SELECT totalpts FROM user WHERE id = ?'
  return db.raw(getPoints, [id])
}

module.exports = bet
