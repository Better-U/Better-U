angular.module('myApp.landing', [])
  .controller('LandingCtrl', function ($scope, $state, $uibModal) {
    $scope.items = [1, 2, 3]

    $scope.animationsEnabled = true

    $scope.signin = function () {
      $state.go('signin')
    }



    $scope.signup = function () {

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

    $scope.signin = function () {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/signin/signin.html',
        controller: 'SigninCtrl',
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
