angular.module('factories', [])
  .factory('authFactory', function ($http) {
    function signUp (username, password) {
      var form = {
        username: username,
        password: password
      }
      console.log('inside authFactory signup', form)
      return $http.post('/api/signup', form)
    }

    function signIn (username, password) {
      var form = {
        username: username,
        password: password
      }
      return $http.post('/api/signin')
    }
    return {
      signUp: signUp,
      signIn: signIn
    }
  })
  .factory('profileFactory', function ($http) {
    function submitProfile (age, gender, height, weight, goalWeight) {
      var profileForm = {
        age: age,
        gender: gender,
        height: height,
        weight: weight,
        goalWeight: goalWeight
      }
      console.log('inside profileFactory submitProfile', profileForm)
      return $http.post('/api/users/profile', profileForm)
    }
    return {
      submitProfile: submitProfile
    }
  })
