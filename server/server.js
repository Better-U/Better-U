var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var db = require('./db.js');
var dotenv = require('dotenv');
dotenv.config();

var health = require('./routes/health');
var fitness = require('./routes/fitness');
var challenge = require('./routes/challenge');
var landing = require('./routes/landing');
var users = require('./routes/users');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true, limit: '25mb'}));
app.use(bodyParser.json({limit: '25mb', extended:true}));

app.use('/api/users/', users);
app.use('/api/landing/', landing);
app.use('/api/health/', health);
app.use('/api/fitness/', fitness);
app.use('/api/challenge/', challenge);

var port = process.env.PORT || 8080;

app.listen(port, console.log('Magic happens on port', port));
