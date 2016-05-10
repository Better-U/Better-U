var db = require('../db')
var schedule = {}

schedule.getGoalDates = function () {
  console.log('inside getGoalDates helper')
  var getGoal = 'SELECT g.date, g.points, b.user_id, b.bettor_id, b.result FROM goals g ' +
    'INNER JOIN bets b ON g.id = b.goals_id ' +
    'WHERE b.status = 1'
  db.raw(getGoal)
    .then(function (data) {
      var goalData = data[0]
      var currentDate = new Date()
      for (var i = 0; i < goalData.length; i++) {
        var goalDate = goalData[i].date
        console.log('this is the goal dates: ', goalData[i].date)
        if (currentDate - goalDate > 0) {
          console.log('inside currentdate - goalDate')
          if (goalData[i].result = 1) {
            // update the user.totalpts where user_id = _
          }
          if (goalData[i].result = 0) {
            // update the user.totalpts where bettor_id = _
          }
        }
      }
    })
}

schedule.updateWinner = function () {}

schedule.updateLoser

module.exports = schedule
