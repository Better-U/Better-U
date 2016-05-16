angular.module('myApp.bet', ['factories'])
  .controller('betCtrl', function ($scope, AuthFactory, $cookies, GoalsFactory, BetsFactory, ProfileFactory) {
    $scope.username = $cookies.get('username')

    $scope.userPoints = null
    $scope.withGoalsList = null
    $scope.userBets = null
    $scope.betsPlacedList = null
    $scope.displayUser = null
    $scope.bettorBets = null
    $scope.totalpts = null

    $scope.topPointsList = function () {
      BetsFactory.getAllPoints($scope.username)
        .then(function (data) {
          $scope.userPoints = data.data.data[0]
        })
    }

    $scope.addBets = function (u_id, g_id) {
      BetsFactory.addBets(u_id, g_id, $scope.username)
        .then(function () {
          swal('Bet Made', 'Click OK to make another bet', 'success')
          $scope.placedBets()
        })
    }

    $scope.submitSearch = function () {
      GoalsFactory.getLog($scope.searchbetuser)
        .then(function (data) {
          $scope.withGoalsList = data.data.data
          $scope.displayUser = $scope.searchbetuser
          for (var i = 0; i < data.data.data.length; i++) {
            $scope.searchBets(data.data.data[i])
          }
        })
    }

    $scope.fetchBets = function () {
      BetsFactory.fetchBets($scope.username)
        .then(function (data) {
          $scope.userBets = data.data.data[0]
        })
    }

    $scope.placedBets = function () {
      BetsFactory.placedBets($scope.username)
        .then(function (data) {
          $scope.betsPlacedList = data.data.data[0]
        })
    }

    $scope.searchBets = function (goal) {
      BetsFactory.searchBets(goal.id, $scope.username)
        .then(function (data) {
          if (data.data.data[0].length > 0) {
            goal.status = true
          } else {
            goal.status = false
          }
        })
    }

    $scope.getPoints = function () {
      ProfileFactory.getProfile($scope.username)
        .then(function (data) {
          $scope.totalpts = data.data[0].totalpts
        })
    }

    $scope.getPoints()
    $scope.topPointsList()
    $scope.placedBets()
    $scope.fetchBets()
  })
