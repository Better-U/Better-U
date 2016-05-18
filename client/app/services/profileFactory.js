angular.module('app.ProfileFactory', [])

  .factory('ProfileFactory', function ($http) {
    function submitProfile (username, weight, bodyFat, activityLvl, interest, gym) {
      var profileForm = {
        username: username,
        weight: weight,
        bodyFat: bodyFat,
        activityLvl: activityLvl,
        interest: interest,
        gym: gym
      }
      return $http.post('/api/users/profile', profileForm)
    }

    function uploadPicture (username, url) {
      var plugin = {
        username: username,
        url: url
      }
      return $http.post('/api/users/picture', plugin)
    }

    function getProfile (username) {
      var params = {
        username: username
      }
      var config = {
        params: params
      }
      return $http.get('/api/users/profile', config)
    }

    return {
      submitProfile: submitProfile,
      getProfile: getProfile,
      uploadPicture: uploadPicture
    }
  })
