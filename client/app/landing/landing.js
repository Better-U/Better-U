angular.module('myApp.landing', [])
  .controller('LandingCtrl', function ($rootScope, $scope, $state, $uibModal, $cookies) {
    // Used to toggle landing/dashboard navbar
    $rootScope.hideit = true
    $rootScope.landing = true
    $rootScope.loggedIn = $cookies.get('token')
    $rootScope.signin = function () {
      $scope.signin()
    }
    // Modal animation
    $scope.animationsEnabled = true

    // Opens signup modal
    $scope.signup = function () {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/signup/signup.html',
        controller: 'SignupCtrl'
      })
    }
    // Opens signin modal
    $scope.signin = function () {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/signin/signin.html',
        controller: 'SigninCtrl'
      })
    }
  })
