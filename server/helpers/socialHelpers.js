var db = require('../db.js')

Social = {}

function getUserID(username){
  return db('user').where({username: username}).select('id')
}
function getIDs (username1, username2) {
  return db('user').whereIn('username', [username1, username2]).select('id')
}

Social.updateAddress = function (username, zipcode) {
  return db('user').where({username: username}).update({zipcode: zipcode})
}
Social.getUsersInZip = function (zipcode) {
  return db('user').where({zipcode: zipcode}).select('username')
}

Social.makeChatRoom = function (username1, username2) {
  console.log('makechatroom being called')
  return new Promise(function (resolve) {
      Social.checkRoomNumber(username1, username2)
        .then(function(data){
          console.log("THIS IS DATAINSIDE MAKECHATROOM", data)
          if(typeof data === 'number'){
            resolve(false)
            console.log('false')
            return
          } else {

      getIDs(username1, username2).then(function(data1){
        db('chatRooms').insert({message: JSON.stringify([])})
          .then(function (data2) {
            console.log(data2, 'data2')
            db('userRooms').insert([{roomID: data2[0], userID: data1[0].id}, {roomID: data2[0], userID: data1[1].id}])
              .then(function () {
                console.log('everything inserted')
                resolve(data2[0])
              })
          })
        })
          }
        })
      })
}

Social.listChats = function(username){
  console.log("listChats CALLED", username)
 return new Promise(function(resolve){
  db('user').where(username).select('id')
    .then(function(data){
      console.log(data, "userID")
      db('userRooms').where({userID: data[0].id}).select('roomID')
        .then(function(data1){
          var newRay = []
          for(var i = 0; i < data1.length; i++){
            newRay.push(data1[i].roomID)
          }
          console.log(newRay, "list of room IDS for user")
          db('userRooms').whereIn('roomID', newRay).whereNot('userID', data[0].id).select('userID')
            .then(function(data2){
              var tempRay = []
              for(var j = 0; j < data2.length; j++){
                tempRay.push(data2[j].userID)
              }
              db('user').whereIn('id', tempRay).select('username')
                .then(function(data){
                  resolve(data)
                })
            console.log("HOPEFULLY LIST OF USERIDS IN LISTCHATS", data)
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
      console.log(data, "DATAINSIDECHECKROOMNUMEBR!!!@#!@")
      db('userRooms').whereIn('userID', [data[0].id, data[1].id]).orWhereIn('userID', [data[0].id, data[1].id])
        .then(function (data2) {
          for (var i = 0; i < data2.length; i++) {
            if(histogram[data2[i].roomID]) {
              resolve(data2[i].roomID)
              called=true
              return
            } else {
            histogram[data2[i].roomID] = true;
          }
          }
          console.log(histogram)
          if(called === false){
            resolve([])
          }
          console.log(data2, 'INSIDE CHECKROOMNUMBER', data[0].id, data[1].id)
        })
    })
  })
}

module.exports = Social
