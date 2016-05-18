angular.module('app.StrengthFactory', [])

  .factory('StrengthFactory', function ($http) {
    function submitStrength (username, date, type, sets, intensity, duration, weight, reps) {
      var strengthForm = {
        username: username,
        date: date,
        type: type,
        sets: sets,
        intensity: intensity,
        duration: duration,
        weight: weight,
        reps: reps
      }
      return $http.post('/api/fitness/strengthForm', strengthForm)
    }
    function getStrength (username) {
      return $http.post('/api/fitness/getStrength', {username: username})
    }
    return {
      submitStrength: submitStrength,
      getStrength: getStrength
    }
  })
