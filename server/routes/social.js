var express = require('express')
var app = express()
var router = express.Router()
var db = require('../db.js')
var helpers = require('../helpers/socialHelpers.js')
var bodyParser = require('body-parser')

var io = require('../common.js').io

io.on('connection', function (socket) {
  var newRoomNumber
  // var name = userNames.getGuestName()
  console.log('socket connection!')
  // send the new user their name and a list of users
  socket.emit('init', {
    name: 'Eric'
  })

  socket.on('joinRoom', function (data) {
    helpers.checkRoomNumber(data.username1, data.username2)
      .then(function (number) {
        console.log("joining room number", number)
        socket.join('' + number)
        socket.emit('roomNumber', {roomNumber: number})
        helpers.getMessages(number)
          .then(function(messageList){
        socket.emit('chatHistory', {messages: messageList})
            
          })
      })
  })
  socket.on('leaveRoom', function(data){
    console.log("leaving Room", data)
    socket.leave("" + data.roomNumber)
  })
  socket.on('listChats', function(username){
    helpers.listChats(username)
      .then(function(data){
        socket.emit('listChats', data)
      })
  })
  socket.on('typing', function(userObj){
    socket.to("" + userObj.roomNumber).broadcast.emit('typing', userObj)
    
  })
  socket.on('send:message', function (data) {
    console.log(data, "message sent")
    var message = {username: data.username, message: data.message}
    socket.to("" + data.roomNumber).emit('send:message', message)
    helpers.saveMessage(data.roomNumber, message)
      .then(function(data){
        console.log(data, "MESSAGE SAVED")
      })
  })
})

  // validate a user's name change, and broadcast it on success


// clean up when a user leaves, and broadcast it to other users
//   socket.on('disconnect', function () {
//     socket.broadcast.emit('user:left', {
//       name: name
//     })
//     userNames.free(name)
//   })
// })

// var nsp = io.of('/pee')
// nsp.on('connection',function(socket){
//   console.log('hello')
//   nsp.emit("hi", "sup")
// socket.on('message', function(){
//     console.log("herro message")
//     helpers.makeChatRoom("janeiffer", "eric")
//       .then(function(data){
//         console.log(data)
//       })

//   })
// })

router.post('/newChat', function (req, res) {
  helpers.makeChatRoom(req.body.username1, req.body.username2)
    .then(function (roomNumber) {
      if (roomNumber) {
        newRoomNumber = roomNumber
        res.send({roomNumber: newRoomNumber})
        socket.join('' + newRoomNumber)
      } else {
        res.send('You already have a chat with this user')
      }
    })
})
router.post('/updateZip', function (req, res) {
  helpers.updateAddress(req.body.username, req.body.zipcode)
    .then(function () {
      res.send('you have changed the zipcode')
    })
})

router.post('/findPeople', function (req, res) {
  helpers.getUsersInZip(req.body.zipcode)
    .then(function (data) {
      res.send(data)
    })
})

module.exports = router
