angular.module('myApp.landing', [])
.controller('LandingCtrl', function($scope, $state){
  $scope.signin = function(){
  	$state.go('signin')
  }

  $scope.signup = function(){
  	$state.go('signup')
  }
})