angular.module('myApp.landing', [])
  .controller('LandingCtrl', function ($rootScope, $scope, $state, $uibModal, $cookies) {
    $rootScope.hideit = true
    $rootScope.landing = true
    $rootScope.loggedIn = $cookies.get('token')
    $rootScope.signin = function () {
      $scope.signin()
    }

    $scope.animationsEnabled = true
    
    $scope.signup = function () {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupCtrl',
        resolve: {
          items: function () {
            return $scope.items
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
            return $scope.items
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
