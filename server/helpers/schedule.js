var db = require('../db')
var schedule = {}

schedule.updateUserPoints = function () {
  console.log('inside getGoalDates helper')
  var getGoal = 'SELECT g.date, g.points, b.user_id, b.bettor_id, b.result FROM goals g ' +
    'INNER JOIN bets b ON g.id = b.goals_id ' +
    'WHERE b.status = 1'
  var updateUser = 'UPDATE user SET totalpts = ? WHERE id = ?'
  var getTotalPoints = 'SELECT totalpts FROM user WHERE id = ?'
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
        // change it back to > 0 later
        if ((currentDate - goalDate) < 0) {
          console.log('this is result from goals table: ', result)
          if (result === 1) {
            console.log('inside winner result')
            db.raw(getTotalPoints, [userId])
              .then(function (data) {
                var winTotal = data[0][0].totalpts + goalPts
                db.raw(updateUser, [winTotal, userId])
                  .then(function (data) {
                    console.log('user-winner successfully logged')
                    db.raw(getTotalPoints, [bettorId])
                      .then(function (data) {
                        var loseTotal = data[0][0].totalpts - goalPts
                        db.raw(updateUser, [loseTotal, bettorId])
                          .then(function (data) {
                            console.log('bettor-loser successfully logged')
                          })
                      })
                  })
              })
          }
          else if (result === 0) {
            console.log('inside loser result')
            db.raw(getTotalPoints, [bettorId])
              .then(function (data) {
                var newTotal = data[0][0].totalpts + goalPts
                db.raw(updateUser, [newTotal, bettorId])
                  .then(function (data) {
                    console.log('bettor-winner successfully logged')
                    db.raw(getTotalPoints, [userId])
                      .then(function (data) {
                        var total = data[0][0].totalpts - goalPts
                        db.raw(updateUser, [total, userId])
                          .then(function (data) {
                            console.log('winner-loser successfully logged')
                          })
                      })
                  })
              })
          }
        }
      }
      console.log('user points updated')
      return 'user points updated'
    })
}

module.exports = schedule
