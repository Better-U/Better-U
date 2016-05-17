var db = require('../db.js')

Social = {}

function getUserID (username) {
  return db('user').where({username: username}).select('id')
}
function getIDs (username1, username2) {
  return db('user').whereIn('username', [username1, username2]).select('id')
}

Social.getImage = function(username){  
  console.log("inside helpers, getting image!", username)
  return db('user').where({username: username}).select('image')
}
Social.getCity = function (username) {
  return db('user').where({username: username}).select('city')
}
Social.updateAddress = function (username, city) {
  return db('user').where({username: username}).update({city: city})
}
Social.getUsersInZip = function (username, city) {
    return new Promise(function (resolve) {
    db('user').where({username: username}).select('id')
      .then(function (data) {
        console.log('inside listchats', data)
        db('userRooms').where({userID: data[0].id}).select('roomID')
          .then(function (data1) {
            var newRay = []
            for (var i = 0; i < data1.length; i++) {
              newRay.push(data1[i].roomID)
            }
            db('userRooms').whereIn('roomID', newRay).whereNot('userID', data[0].id).select('userID')
              .then(function (data2) {
                var tempRay = []
                for (var j = 0; j < data2.length; j++) {
                  tempRay.push(data2[j].userID)
                }
                db('user').whereNotIn('id', tempRay).andWhere({city: city}).andWhereNot({'username': username}).select('username', 'interest', 'gym', 'city', 'image')
                  .then(function (data) {
                    console.log("getUsersinZip called", data)
                    resolve(data)
                  })
              })
          })
      })
  })



}

Social.makeChatRoom = function (username1, username2) {
  return new Promise(function (resolve) {
    Social.checkRoomNumber(username1, username2)
      .then(function (data) {
        if (typeof data === 'number') {
          resolve(false)
          return
        } else {
          getIDs(username1, username2).then(function (data1) {
            db('chatRooms').insert({message: JSON.stringify([])})
              .then(function (data2) {
                db('userRooms').insert([{roomID: data2[0], userID: data1[0].id}, {roomID: data2[0], userID: data1[1].id}])
                  .then(function () {
                    resolve(data2[0])
                  })
              })
          })
        }
      })
  })
}

Social.listChats = function (username) {
  return new Promise(function (resolve) {
    db('user').where({username: username}).select('id')
      .then(function (data) {
        console.log('inside listchats', data)
        db('userRooms').where({userID: data[0].id}).select('roomID')
          .then(function (data1) {
            var newRay = []
            for (var i = 0; i < data1.length; i++) {
              newRay.push(data1[i].roomID)
            }
            db('userRooms').whereIn('roomID', newRay).whereNot('userID', data[0].id).select('userID')
              .then(function (data2) {
                var tempRay = []
                for (var j = 0; j < data2.length; j++) {
                  tempRay.push(data2[j].userID)
                }
                db('user').whereIn('id', tempRay).select('username', 'image')
                  .then(function (data) {
                    resolve(data)
                  })
              })
          })
      })
  })
}
Social.checkRoomNumber = function (username1, username2) {
  var called = false
  var histogram = {}
  return new Promise(function (resolve) {
    getIDs(username1, username2).then(function (data) {
      // data[0].id, data[1].id
      db('userRooms').whereIn('userID', [data[0].id, data[1].id]).orWhereIn('userID', [data[0].id, data[1].id])
        .then(function (data2) {
          for (var i = 0; i < data2.length; i++) {
            if (histogram[data2[i].roomID]) {
              resolve(data2[i].roomID)
              called = true
              return
            } else {
              histogram[data2[i].roomID] = true
            }
          }
          console.log(histogram)
          if (called === false) {
            resolve([])
          }
        })
    })
  })
}

Social.saveMessage = function (room, message) {
  return new Promise(function (resolve) {
    db('chatRooms').where({id: room}).select('message')
      .then(function (data) {
        var allMessages = JSON.parse(data[0].message)
        allMessages.push(message)
        db('chatRooms').where({id: room}).update({message: JSON.stringify(allMessages)})
          .then(function (data) {
            resolve(data)
          })
      })
  })
}

Social.getMessages = function (room) {
  return db('chatRooms').where({id: room}).select('message')
}
module.exports = Social
