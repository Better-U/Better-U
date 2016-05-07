var db = require('../db')
var bet = {}

bet.fetchBet = function (id, bet_id) {
  return db.select('*').from('bets').where({'user_id': id, bettor_id: bet_id})
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

}

module.exports = bet
