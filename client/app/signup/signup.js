angular.module('myApp.signup', ['factories'])

  .controller('SignupCtrl', function ($scope, authFactory, $state) {
    $scope.signUp = function () {
      console.log('signup button')
      authFactory.signUp($scope.user.name, $scope.user.password)
        .then(function (data) {
          console.log(data)
        })
    }

    $scope.goSignin = function () {
      $state.go('signin')
    }
  })
