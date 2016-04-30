angular.module('myApp.signup', ['factories'])

  .controller('SignupCtrl', function ($scope, authFactory, $state, $uibModalInstance) {
    $scope.alreadyExists;

    $scope.signUp = function () {
      console.log('signup button')
      authFactory.signUp($scope.user.name, $scope.user.password)
        .then(function (data) {
          $scope.alreadyExists = data.data.exists
          if ($scope.alreadyExists) {
            console.log('inside here')
            $state.reload('signin')
          }
          // $state.go('dashboard')
        })
    }

    $scope.goSignin = function () {
      $state.go('signin')
    }

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
      // $state.go('registerProfile')
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }
  })
