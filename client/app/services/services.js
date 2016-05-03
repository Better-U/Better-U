angular.module('factories', [])
  .factory('authFactory', function ($http) {
    var userData = null
    var userToken = null

    function registerUserDetails (username, password) {
      var form = {
        username: username,
        password: password
      }

      return $http.post('/api/signup/regUser', form)
    }

    function registerProfileDetails (name, age, height, weight, gender, interest, gym) {
      if (gender === 'male') {
        gender = 0
      } else {
        gender = 1
      }

      var form = {
        username: name,
        age: age,
        height: height,
        weight: weight,
        gender: gender,
        interest: interest,
        gym: gym
      }

      return $http.post('/api/signup/regProfile', form)
    }

    function signIn (username, password) {
      var plugin = {
        username: username,
        password: password
      }
      return $http.post('/api/signin', plugin)
    }

    function parseJwt (token) {
      var base64Url = token.split('.')[1];
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

    function getToken () {
      return window.localStorage.getItem('token')
    }

    function isAuth () {
      var token = getToken()
      if (token) {
        var params = parseJwt(token)
        return Math.round(new Date().getTime() / 1000) <= params.exp
      } else {
        console.error('No token found')
        return false
      }
    }

    return {
      userData: userData,
      userToken: userToken,
      registerUserDetails: registerUserDetails,
      registerProfileDetails: registerProfileDetails,
      signIn: signIn,
      isAuth: isAuth
    }

  })

  .factory('profileFactory', function ($http) {
    function submitProfile (id, bodyFat, activityLvl, interest) {
      var profileForm = {
        id: id,
        bodyFat: bodyFat,
        activityLvl: activityLvl,
        interest: interest
      }
      console.log('inside profileFactory submitProfile', profileForm)
      return $http.post('/api/users/profile', profileForm)
    }

    function getProfile (id) {
      var params = {
        id: id
      }

      var config = {
        params: params
      }
      return $http.get('/api/users/profile', config)
    }

    return {
      submitProfile: submitProfile,
      getProfile: getProfile
    }
  })

  .factory('cardioFactory', function ($http) {
    function submitCardio (username, date, type, distance, duration, pace, intensity) {
      var cardioForm = {
        username: username,
        date: date,
        type: type,
        distance: distance,
        duration: duration,
        pace: pace,
        intensity: intensity
      }
      console.log('this is cardioForm: ', cardioForm)
      return $http.post('/api/fitness/cardioForm', cardioForm)
    }

    function getCardio (username) {
      var username = {username:  username}
      return $http.post('/api/fitness/getCardio', username)
    }

    return {
      submitCardio: submitCardio,
      getCardio: getCardio
    }
  })
