var db = require('../db.js')

Social = {}
Social.updateAddress = function (username, zipcode) {
  return db('user').where({username: username}).update({zipcode: zipcode})
}
Social.getUsersInZip = function (zipcode) {
  return db('user').where({zipcode: zipcode}).select('username')
}

Social.makeChatRoom = function (username1, username2) {
  return new Promise(function (resolve) {
    db('user').where({username: username1}).orWhere({username: username2}).select('id')
      .then(function (data1) {
        console.log(data1, 'data1')
              db('chatRooms').insert({message: JSON.stringify([])})
                .then(function (data2) {
                  db('userRooms').insert({roomID: data2[0], userID: data1[0].id}, {roomID: data2[0], userID: data1[1].id})
                    .then(function () {
                      resolve(data2[0])
                    })
                })
          })
      })
  }

module.exports = Social
