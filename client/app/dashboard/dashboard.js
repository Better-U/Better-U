angular.module('myApp.dashboard', [])

  .controller('DashboardCtrl', function ($scope, $state, authFactory) {
    $scope.signout = function () {
      console.log('before', window.localStorage.getItem('token'))
      window.localStorage.removeItem('token')
      authFactory.userData = null
      console.log(window.localStorage.getItem('token'))

      $state.go('landing')
    }
  })
