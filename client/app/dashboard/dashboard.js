angular.module('myApp.dashboard', [])

  .controller('DashboardCtrl', function ($scope, $state, authFactory, $cookies) {
    $scope.signout = function () {
      window.localStorage.removeItem('username')
      $cookies.remove('token')
      $cookies.remove('username')
      $state.go('landing')
    }
  })
