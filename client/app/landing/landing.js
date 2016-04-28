angular.module('myApp.landing', [])

  .controller('LandingCtrl', function ($scope) {
    $scope.alert = function () {
      console.log('logged')
    }
  })
