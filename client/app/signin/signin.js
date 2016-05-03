angular.module('myApp.signin', [])

  .controller('SigninCtrl', function ($scope, $state, authFactory, $uibModalInstance, $uibModal) {
    $scope.animationsEnabled = true
    $scope.userDoesNotExist = null
    $scope.goSignup = function () {
      $state.go('signup')
    }

    $scope.signin = function () {
      console.log('login call:', $scope.user.name, $scope.user.password)
      authFactory.signIn($scope.user.name, $scope.user.password)
        .then(function (data) {
          console.log(data.data.success)
          if (!data.data.success) {
            $state.reload()
            $scope.userDoesNotExist = true
          } else {
            $uibModalInstance.dismiss('cancel')
            authFactory.userData = data.config.data
            authFactory.userToken = data.data.token
            $scope.token = data.data.token
            window.localStorage.setItem('token', authFactory.userToken.token)
            $state.go('dashboard')
          }

        })
    }

    $scope.signup = function () {
      $uibModalInstance.dismiss('cancel')
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      })

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem
      }, function () {
        console.log('hi')
      })
    }
  })
