angular.module('myApp.login', [])

  .controller('LoginCtrl', function ($scope) {
    $scope.alert = function () {
      console.log('logged')
    }
  })

