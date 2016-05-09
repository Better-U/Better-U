angular.module('myApp.bet', ['factories'])
  .controller('betCtrl', function ($scope, authFactory, $cookies, GoalsFactory, BetsFactory) {

    var username = $cookies.get('username')

    // Top Users Points
    $scope.userPoints = null
    $scope.topPointsList = function () {
      BetsFactory.getAllPoints(username)
      .then(function (data) {
        console.log('this is data from getAllPoints: ', data.data.data[0])
        $scope.userPoints = data.data.data[0]
      })
    }
    $scope.topPointsList()

    $scope.withGoalsList = null
    $scope.submitSearch = function () {
      GoalsFactory.getLog($scope.searchbetuser)
        .then(function (data) {
          $scope.withGoalsList = data.data.data
        })
    }

    $scope.userBets = null
    $scope.fetchBets = function () {
      BetsFactory.fetchBets(username)
        .then(function (data) {
          console.log('this is data from fetchBets: ', data.data.data[0])
          $scope.userBets = data.data.data[0]
        })
    }
    $scope.fetchBets()
  })
