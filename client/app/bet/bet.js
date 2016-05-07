angular.module('myApp.bet', ['factories'])
  .controller('betCtrl', function ($scope, authFactory, $cookies, GoalsFactory) {

    var username = $cookies.get('username')

    // Dummy Data - top points List
    $scope.topPointsList = [{username: 'Pam', totalpts: 1240}, {username: 'Bob', totalpts: 3000}, {username: 'Jim', totalpts: 2340}]
    
    $scope.submitSearch = function () {
      GoalsFactory.getLog($scope.searchbetuser)
        .then(function (data) {
          $scope.withGoalsList = data.data.data
        })
    }
  })
