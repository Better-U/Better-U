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
    socket.join('' + 10)
    console.log('room is joined')
    helpers.checkRoomNumber(data.username1, data.username2)
    io.to(''+ 10).emit('message', {hello: "hello everyone"})
  })

  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', data)
  })
  // validate a user's name change, and broadcast it on success
  socket.on('change:name', function (data, fn) {
    if (userNames.claim(data.name)) {
      var oldName = name
      userNames.free(oldName)

      name = data.name

      socket.broadcast.emit('change:name', {
        oldName: oldName,
        newName: name
      })

      fn(true)
    } else {
      fn(false)
    }
  })
})

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
  console.log('new chat API request received')
  helpers.makeChatRoom(req.body.username1, req.body.username2)
    .then(function (roomNumber) {
      console.log(roomNumber)
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
