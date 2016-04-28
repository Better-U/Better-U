angular.module('myApp.login', [])

.controller('LoginCtrl', function ($scope) {
  $scope.alert = function () {
    console.log('logged')
  }
  $scope.login = function () {
    console.log('pressed login button')
  }
})
