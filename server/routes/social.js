var express = require('express')
var app = express()
var router = express.Router()
var db = require('../db.js')
var helpers = require('../helpers/socialHelpers.js')
var bodyParser = require('body-parser')

var io = require('../common.js').io

io.on('connection', function (socket) {
  // var name = userNames.getGuestName();
console.log('socket connection!')
  // send the new user their name and a list of users
  socket.emit('init', {
    name: "Eric",
    users: "pizza"
  });

  // notify other clients that a new user has joined
  // socket.broadcast.emit('user:join', {
  //   name: name
  // });

  // // broadcast a user's message to other users
  socket.on('send:message', function (data) {
    socket.broadcast.emit('send:message', data)
  });

  // // validate a user's name change, and broadcast it on success
  // socket.on('change:name', function (data, fn) {
  //   if (userNames.claim(data.name)) {
  //     var oldName = name;
  //     userNames.free(oldName);

  //     name = data.name;

  //     socket.broadcast.emit('change:name', {
  //       oldName: oldName,
  //       newName: name
  //     });

  //     fn(true);
  //   } else {
  //     fn(false);
  //   }
  // });

  // // clean up when a user leaves, and broadcast it to other users
  // socket.on('disconnect', function () {
  //   socket.broadcast.emit('user:left', {
  //     name: name
  //   });
  //   userNames.free(name);
  // });
})

router.post('/updateZip', function (req, res) {
  helpers.updateAddress(req.body.id, req.body.zipcode)
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
