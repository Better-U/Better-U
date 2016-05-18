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
  return new Promise(function (resolve, reject) {
    User.findPassword(username)
      .then(function (data) {
        bcrypt.compare(password, data[0].password, function (err, response) {
          if (err) {
            console.log(err)
            reject(err)
          } else {
            console.log('this is password response: ', response)
            resolve(response)
          }
        })
      })
  })
}

User.insertUserPw = function (username, password) {
  console.log('password inside insertPW', password)
  var signUpObj = {
    username: username,
    password: password
  }
  return db('user').insert(signUpObj)
}

User.insertUserProfile = function (age, weight, height, gender, activitylvl, interest, gym, id) {
  console.log('inside helper', id)
  var profileObj = {
    age: age,
    weight: weight,
    height: height,
    gender: gender,
    activitylvl: activitylvl,
    interest: interest,
    totalpts: 1000,
    gym: gym
  }

  return db('user').where({id: id}).update(profileObj)
}

User.registerProfile = function (username, weight, bodyFat, activitylvl, interest, gym) {
  var profileDetails = {
    weight: weight,
    bodyfat: bodyFat,
    activitylvl: activitylvl,
    interest: interest,
    gym: gym
  }
  console.log('User.registerProfile, profile details', profileDetails)
  return db('user').where({username: username}).update(profileDetails)
}

User.getProfileInfo = function (username) {
  console.log('username inside getprofileinfo', username)
  return db('user').where({username: username}).select()
}

User.postFoodLog = function (id, name, date, time, serving, cal, carbs, fat, fiber, sodium, protein, water) {
  console.log('inside postFoodLog')
  var foodLog = {
    user_id: id,
    name: name,
    date: date,
    time: time,
    serving: serving,
    cal: cal,
    carbs: carbs,
    fat: fat,
    fiber: fiber,
    sodium: sodium,
    protein: protein,
    water: water
  }
  return db('nutrition_record').insert(foodLog)
}

module.exports = User
