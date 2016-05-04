var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io')(server)

module.exports = {
  app: app,
  server: server,
  io: io,
  express: express
}
