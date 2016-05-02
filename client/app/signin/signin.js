angular.module('myApp.signin', ['factories'])

  .controller('SigninCtrl', function ($scope, $state, authFactory, $uibModalInstance) {

    $scope.goSignup = function () {
      $state.go('signup')
    }

    $scope.login = function () {
      authFactory.signIn($scope.user.name, $scope.user.password)
        .then(function (data) {
          console.log('data', data)
          authFactory.userData = data.data
          $scope.token = data.data.token
          console.log($scope.token)
          window.localStorage.setItem('token', authFactory.userData.token)
          $state.go('dashboard')
        })
    }
  })
