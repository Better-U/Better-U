var common = require('./common.js')
var express = common.express
var app = common.app
var server = common.server
var cors = require('cors')
var bodyParser = require('body-parser')
var path = require('path')
var dotenv = require('dotenv')
var db = require('./db.js')

dotenv.config()

var health = require('./routes/health')
var fitness = require('./routes/fitness')
var goals = require('./routes/goals')
var users = require('./routes/users')
var signin = require('./routes/signin')
var signup = require('./routes/signup')
var social = require('./routes/social')
var bet = require('./routes/bet')

app.use(cors())
app.use(express.static('./client'))
app.use(bodyParser.urlencoded({extended: true, limit: '25mb'}))
app.use(bodyParser.json({limit: '25mb', extended: true}))
app.use('/scripts', express.static(path.join(__dirname, '/../node_modules')))

app.use('/api/users/', users)
app.use('/api/signin/', signin)
app.use('/api/health/', health)
app.use('/api/fitness/', fitness)
app.use('/api/goals/', goals)
app.use('/api/signup/', signup)
app.use('/api/social/', social)
app.use('/api/bet/', bet)

var port = process.env.PORT || 8080

server.listen(port, console.log('Magic happens on port', port))
