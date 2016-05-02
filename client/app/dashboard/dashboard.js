angular.module('myApp.dashboard', [])

  .controller('DashboardCtrl', function ($scope, $state) {
    $scope.signout = function () {
      console.log('before', window.localStorage.getItem('token'))
      window.localStorage.removeItem('token')
      console.log(window.localStorage.getItem('token'))
      // delete $window.localStorage['jwtToken'];
      // $rootScope.$broadcast('loggedOut');
      $state.go('landing')
    }
  })
