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
