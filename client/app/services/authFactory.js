angular.module('myApp.AuthFactory', [])

  .factory('AuthFactory', function ($http, $cookies) {
    var userData = null

    function registerUserDetails (username, password) {
      var form = {
        username: username,
        password: password
      }
      return $http.post('/api/signup/regUser', form)
    }

    function getProfile (username) {
      var params = {
        username: username
      }
      var config = {
        params: params
      }
      return $http.get('/api/signup/profile', config)
    }

    function registerProfileDetails (name, age, height, weight, gender, activity, interest, gym) {
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
        activity: activity,
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
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace('-', '+').replace('_', '/')
      return JSON.parse(window.atob(base64))
    }

    function getToken () {
      return $cookies.get('token')
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
      getToken: getToken,
      getProfile: getProfile,
      registerUserDetails: registerUserDetails,
      registerProfileDetails: registerProfileDetails,
      signIn: signIn,
      userData: userData,
      isAuth: isAuth
    }
  })

