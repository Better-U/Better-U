angular.module('factories', [])
  .factory('authFactory', function ($http) {
    var userData = null
    var userToken = null

    function registerUserDetails (username, password) {
      var form = {
        username: username,
        password: password
      }
      console.log('inside authFactory signup', form)
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
      console.log('inside authFactory profile register', form)
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
      return JSON.parse($window.atob(base64));
    }

    return {
      userData: userData,
      userToken: userToken,
      registerUserDetails: registerUserDetails,
      registerProfileDetails: registerProfileDetails,
      signIn: signIn
    }

  })

  .factory('profileFactory', function ($http) {
    function submitProfile (bodyFat, activityLvl, interest) {
      var profileForm = {
        bodyFat: bodyFat,
        activityLvl: activityLvl,
        interest: interest
      }
      console.log('inside profileFactory submitProfile', profileForm)
      return $http.post('/api/users/profile', profileForm)
    }
    return {
      submitProfile: submitProfile
    }
  })

  .factory('cardioFactory', function ($http) {
    function submitCardio (date, type, distance, duration, pace, intensity) {
      var cardioForm = {
        date: date,
        type: type,
        distance: distance,
        duration: duration,
        pace: pace,
        intensity: intensity
      }
      console.log('this is cardioForm: ', cardioForm)
      return $http.post('/api/fitness/cardio', cardioForm)
    }
    return {
      submitCardio: submitCardio
    }
  })
