angular.module('factories', [])
  .factory('authFactory', function ($http) {
    var userData

    function signUp (username, password) {
      var form = {
        username: username,
        password: password
      }
      console.log('inside authFactory signup', form)
      return $http.post('/api/signup', form)
    }

    function signIn (username, password) {
      var plugin = {
        username: username,
        password: password
      }
      return $http.post('/api/signin', plugin)
    }
    return {
      userData: userData,
      signUp: signUp,
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
    function submitCardio (date, category, type, distance, duration) {
      var cardioForm = {
        date: date,
        category: category,
        type: type,
        distance: distance,
        duration: duration
      }
      console.log('this is cardioForm: ', cardioForm)
      return $http.post('/api/fitness/cardio', cardioForm)
    }
    return {
      submitCardio: submitCardio
    }
  })
