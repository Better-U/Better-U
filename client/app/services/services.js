angular.module('factories', [])
  .factory('authFactory', function ($http) {

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
      console.log(token)
      var base64Url = token.split('.')[1]
      console.log(base64Url);
      var base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }

    function getToken () {
      console.log('inside get token', window.localStorage.getItem('token'))
      return window.localStorage.getItem('token')
    }

    function isAuth () {
      var token = getToken()
      console.log('token: ', token)
      if (token) {
        var params = parseJwt(token)
        return Math.round(new Date().getTime() / 1000) <= params.exp
      } else {
        console.error('No token found')
        window.localStorage.removeItem('username')
        window.localStorage.removeItem('token')
        return false
      }
    }

    return {
      getToken: getToken,
      registerUserDetails: registerUserDetails,
      registerProfileDetails: registerProfileDetails,
      signIn: signIn,
      isAuth: isAuth
    }

  })

  .factory('profileFactory', function ($http) {
    function submitProfile (id, weight, bodyFat, activityLvl, interest, gym) {
      var profileForm = {
        id: id,
        weight: weight,
        bodyFat: bodyFat,
        activityLvl: activityLvl,
        interest: interest,
        gym: gym
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
