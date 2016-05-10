angular.module('myApp.bet', ['factories'])
  .controller('betCtrl', function ($scope, authFactory, $cookies, GoalsFactory, BetsFactory) {

    var username = $cookies.get('username')

    $scope.userPoints = null
    $scope.withGoalsList = null
    $scope.userBets = null
    $scope.betsPlacedList = null
    $scope.displayUser = null

    $scope.topPointsList = function () {
      BetsFactory.getAllPoints(username)
      .then(function (data) {
        console.log('this is data from getAllPoints: ', data.data.data[0])
        $scope.userPoints = data.data.data[0]
      })
    }

    $scope.addBets = function (u_id, g_id) {
      BetsFactory.addBets(u_id, g_id, username)
        .then(function () {
          console.log('Bet made line 22')
          swal('Bet Made', 'Click OK to make another bet.', 'success')
          $scope.placedBets()
        })
    }

    $scope.submitSearch = function () {
      GoalsFactory.getLog($scope.searchbetuser)
        .then(function (data) {
          $scope.withGoalsList = data.data.data
          console.log('This is line 23', data.data.data)
          $scope.displayUser = $scope.searchbetuser
        })
    }

    $scope.fetchBets = function () {
      BetsFactory.fetchBets(username)
        .then(function (data) {
          console.log('this is data from fetchBets: ', data.data.data[0])
          $scope.userBets = data.data.data[0]
        })
    }

    $scope.placedBets = function () {
      BetsFactory.placedBets(username)
        .then(function (data) {
          console.log('Line 38. Bet.js placedBets: ', data)
          $scope.betsPlacedList = data.data.data[0]
        })
    }

    $scope.topPointsList()
    $scope.placedBets()
    $scope.fetchBets()
  })
