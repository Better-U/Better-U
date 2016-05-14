angular.module('factories', [])

  .factory('cardioFactory', function ($http) {
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
      console.log('cardio Form inside cardio factory =', cardioForm)
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
      console.log('this is points: ', plugin.points)
      console.log('inside postlog service', plugin)

      return $http.post('/api/goals/', plugin)
    }

    function getLog (username) {
      console.log('inside getlog', username)
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

  .factory('BetsFactory', function ($http) {
    function getAllPoints (username) {
      var params = {
        username: username
      }
      var config = {
        params: params
      }
      return $http.get('/api/bet/getAllPoints', config)
    }

    function fetchBets (username) {
      var params = {
        username: username
      }
      var config = {
        params: params
      }
      return $http.get('/api/bet/fetchBets', config)
    }

    function placedBets (username) {
      var params = {
        username: username
      }
      var config = {
        params: params
      }
      console.log('inside placedBets: ', username)
      return $http.get('api/bet/placedBets', config)
    }

    function addBets (u_id, g_id, username) {
      var bet = {
        goals_id: g_id,
        user_id: u_id,
        username: username
      }
      console.log('Inside addBets: ', bet)
      return $http.post('api/bet/addBets', bet)
    }

    return {
      getAllPoints: getAllPoints,
      fetchBets: fetchBets,
      placedBets: placedBets,
      addBets: addBets
    }
  })
