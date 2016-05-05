var db = require('../db.js')

Social = {}

function getIDs(username1, username2) {
	return db('user').whereIn('username', [username1, username2]).select('id');
}

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
          	console.log(data2, "data2")
            db('userRooms').insert([{roomID: data2[0], userID: data1[0].id}, {roomID: data2[0], userID: data1[1].id}])
              .then(function () {
              	console.log("everything inserted")
                resolve(data2[0])
              })
          })
      })
  })
}

Social.checkRoomNumber = function(username1, username2){
	return new Promise(function(resolve){

			 getIDs(username1, username2).then(function(data){
	  	// data[0].id, data[1].id
    	return db('userRooms').whereIn('userID', [data[0].id, data[1].id]).orWhereIn('userID', [data[0].id, data[1].id])
    	  .then(function(data2){
    	  	console.log(data2, "INSIDE CHECKROOMNUMBER")
    	  	resolve(data2)
    	  })
	  })

	})
	

// roomID
// userID
}

module.exports = Social
