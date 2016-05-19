angular.module('myApp.GoalsFactory', [])

  .factory('GoalsFactory', function ($http) {
    function postLog (type, data, intensity, category, value, measurement, username, points) {
      var plugin = {
        type: type,
        date: data,
        intensity: intensity,
        category: category,
        value: value,
        measurement: measurement,
        username: username,
        points: points
      }

      return $http.post('/api/goals/', plugin)
    }

    function getLog (username) {
      var params = {
        username: username
      }
      var config = {
        params: params
      }

      return $http.get('/api/goals/', config)
    }

    function checkBets (goals_id) {
      var params = {
        goals_id: goals_id
      }
      var config = {
        params: params
      }
      return $http.get('/api/goals/bets', config)
    }

    function removeLog (id) {
      var params = {
        id: id
      }
      var config = {
        params: params
      }
      return $http.delete('/api/goals/', config)
    }

    return {
      postLog: postLog,
      getLog: getLog,
      removeLog: removeLog,
      checkBets: checkBets
    }
  })


