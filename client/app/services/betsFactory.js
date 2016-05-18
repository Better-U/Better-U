angular.module('myApp.BetsFactory', [])

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

    function searchBets (id, username) {
      var params = {
        username: username,
        goals_id: id
      }
      var config = {
        params: params
      }
      return $http.get('/api/bet/searchBets', config)
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
      return $http.get('api/bet/placedBets', config)
    }

    function addBets (u_id, g_id, username) {
      var bet = {
        goals_id: g_id,
        user_id: u_id,
        username: username
      }
      return $http.post('api/bet/addBets', bet)
    }

    function bettorBets (username) {
      var params = {
        username: username
      }
      var config = {
        params: params
      }
      return $http.get('api/bet/bettor', config)
    }

    return {
      getAllPoints: getAllPoints,
      fetchBets: fetchBets,
      placedBets: placedBets,
      addBets: addBets,
      searchBets: searchBets,
      bettorBets: bettorBets
    }
  })