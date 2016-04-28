angular.module('myApp.landing', [])

  .controller('LandingCtrl', function ($scope) {
    $scope.alert = function () {
      console.log('logged')
    }
    $scope.signUp = function () {
      console.log('signup button')
    }
  })
