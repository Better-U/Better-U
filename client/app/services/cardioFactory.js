angular.module('myApp.CardioFactory', [])

  .factory('CardioFactory', function ($http) {
    function submitCardio (username, date, time, type, distance, duration, pace, intensity) {
      var cardioForm = {
        username: username,
        date: date,
        time: time,
        type: type,
        distance: distance,
        duration: duration,
        pace: pace,
        intensity: intensity
      }
      return $http.post('/api/fitness/cardioForm', cardioForm)
    }

    function getCardio (username) {
      var params = {
        username: username
      }

      var config = {
        params: params
      }

      return $http.get('/api/fitness/getCardio', config)
    }

    return {
      submitCardio: submitCardio,
      getCardio: getCardio
    }
  })
