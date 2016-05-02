angular.module('myApp.dashboard', [])

  .controller('DashboardCtrl', function ($scope, $state, authFactory) {
    $scope.signout = function () {
      window.localStorage.removeItem('token')
      authFactory.userData = null
      $state.go('landing')
    }
  })
