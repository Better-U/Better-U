var db = require('../db')
var Promise = require('bluebird')
var schedule = {}

var promiseWhile = function (condition, action) {
  var resolver = Promise.defer()
  var loop  = function () {
    if (!condition()) return resolver.resolve()
      return Promise.cast(action())
        .then(loop)
        .catch(resolver.reject)
  }
  process.nextTick(loop)
  return resolver.promise
}

// schedule.updateResults = function () {}

schedule.updateUserPoints = function () {
  console.log('inside updateUserPoints helper')
  var counter = 0
  var getGoal = 'SELECT g.date, g.points, b.user_id, b.bettor_id, b.result, b.id FROM goals g ' +
    'INNER JOIN bets b ON g.id = b.goals_id ' +
    'WHERE b.status = 1'
  var updateUser = 'UPDATE user SET totalpts = ? WHERE id = ?'
  var getTotalPoints = 'SELECT totalpts FROM user WHERE id = ?'
  var updateStatus = 'UPDATE bets SET status = 0 WHERE id = ?'
  db.raw(getGoal)
    .then(function (data) {
      var goalData = data[0]
      promiseWhile(function () {
        return counter < goalData.length
      }, function () {
        return new Promise(function (resolve, reject) {
          console.log('inside updateUserPoints promiseWhile')
          var currentDate = new Date()
          var goalDate = goalData[counter].date
          var userId = goalData[counter].user_id
          var goalPts = goalData[counter].points
          var bettorId = goalData[counter].bettor_id
          var result = goalData[counter].result
          var betId = goalData[counter].id
          if((currentDate - goalDate) > 0) {
            if(result === 1) {
            db.raw(getTotalPoints, [userId])
              .then(function (data) {
                var winTotal = data[0][0].totalpts + goalPts
                console.log('this is winTotal: ', winTotal)
                db.raw(updateUser, [winTotal, userId])
                  .then(function (data) {
                    console.log('user-winner successfully logged')
                    db.raw(getTotalPoints, [bettorId])
                      .then(function (data) {
                        var loseTotal = data[0][0].totalpts - goalPts
                        console.log('this is loserTotal: ', loseTotal)
                        db.raw(updateUser, [loseTotal, bettorId])
                          .then(function (data) {
                            console.log('bettor-loser successfully logged')
                            db.raw(updateStatus, [betId])
                              .then(function (data) {
                                console.log('updated bets status -- win')
                                counter++
                                resolve()
                              })
                          })
                      })
                  })
              })
            }
            else if (result === 0) {
              db.raw(getTotalPoints, [bettorId])
                .then(function (data) {
                  var newTotal = data[0][0].totalpts + goalPts
                  console.log('this is newTotal: ', newTotal)
                  db.raw(updateUser, [newTotal, bettorId])
                    .then(function (data) {
                      console.log('bettor-winner successfully logged')
                      db.raw(getTotalPoints, [userId])
                        .then(function (data) {
                          var total = data[0][0].totalpts - goalPts
                          console.log('this is total: ', total)
                          db.raw(updateUser, [total, userId])
                            .then(function (data) {
                              console.log('winner-loser successfully logged')
                              db.raw(updateStatus, [betId])
                                .then(function (data) {
                                  console.log('updated bets status -- lose')
                                  counter++
                                  resolve()
                                })
                            })
                        })
                    })
                })
            }
          }
        }).then(function () {
          console.log('done')
        })
      })
    })
}

module.exports = schedule
