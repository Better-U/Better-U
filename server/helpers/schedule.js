var db = require('../db')
var schedule = {}

schedule.updateUserPoints = function () {
  console.log('inside getGoalDates helper')
  var getGoal = 'SELECT g.date, g.points, b.user_id, b.bettor_id, b.result FROM goals g ' +
    'INNER JOIN bets b ON g.id = b.goals_id ' +
    'WHERE b.status = 1'
  var updateWinner = 'UPDATE user SET totalpts = totalpts + ? WHERE id = ?'
  var updateLoser = 'UPDATE user SET totalpts = totalpts - ? WHERE id = ?'
  db.raw(getGoal)
    .then(function (data) {
      var goalData = data[0]
      var currentDate = new Date()
      for (var i = 0; i < goalData.length; i++) {
        var goalDate = goalData[i].date
        var userId = goalData[i].user_id
        var goalPts = goalData[i].points
        var bettorId = goalData[i].bettor_id
        var result = goalData[i].result
        console.log('this is the goal dates: ', goalData[i].date)
        console.log('this is currentDate: ', currentDate - goalDate)
        if ((currentDate - goalDate) > 0) {
          console.log('inside currentdate - goalDate')
          if (result = 1) {
            db.raw(updateWinner, [goalPts, userId])
              .then(function () {
                db.raw(updateLoser, [goalPts, bettorId])
                  .then(function (data) {
                    return data
                    console.log('user-winner successfully logged')
                  })
              })
          }
          else {
            db.raw(updateWinner, [goalPts, bettorId])
              .then(function () {
                db.raw(updateLoser, [goalPts, userId])
                  .then(function (data) {
                    return data
                    console.log('user-loser successfully logged')
                  })
              })
          }
        }
      }
    })
}

module.exports = schedule
