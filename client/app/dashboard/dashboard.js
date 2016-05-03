angular.module('myApp.dashboard', [])

  .controller('DashboardCtrl', function ($scope, $state, authFactory) {
    $scope.signout = function () {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('username')
      $state.go('landing')
    }
  })
