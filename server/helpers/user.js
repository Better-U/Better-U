var db = require('../db')
var bcrypt = require('bcrypt')
var saltRounds = 10
var User = {}

User.findUser = function (username) {
  console.log('findUser:', username)
  return db('user').where({username: username}).select('id')
}

User.hashPassword = function (password) {
  return new Promise(function (resolve, reject) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) {
          reject(err)
        }
        console.log('hash', hash)
        resolve(hash)
      })
  })
}

User.findPassword = function (username) {
  return db('user').select('password').where({username: username})
}

User.comparePassword = function (username, password) {
  return new Promise (function (resolve, reject) {
      User.findPassword(username)
        .then(function (data) {
          bcrypt.compare(password, data[0].password, function (err, response) {
            if (err) {
              console.log(err)
              reject(err)
            } else {
              resolve(response)
            }
        })
      })
    }
  )}

User.insertUserPw = function (username, password) {
  console.log('password inside insertPW', password)
  var signUpObj = {
    username: username,
    password: password
  }
  return db('user').insert(signUpObj)
}

User.insertUserProfile = function (age, weight, height, gender, interest, gym, id) {
  console.log('inside helper', id)
  var profileObj = {
    age: age,
    weight: weight,
    height: height,
    gender: gender,
    interest: interest,
    gym: gym
  }

  return db('user').where({id: id}).update(profileObj)
}

User.registerProfile = function (id, bodyFat, activitylvl, interest) {
  console.log('inside User helper.registerProfile id=', id)
  var profileDetails = {
    bodyfat: bodyFat,
    activitylvl: activitylvl,
    interest: interest
  }
  console.log('User.registerProfile, profile details', profileDetails)
  return db('user').where({id: id}).update(profileDetails)
}

User.getProfileInfo = function (id) {
  console.log('id inside getprofileinfo', id)
  return db('user').where({id: id}).select()
}

module.exports = User
