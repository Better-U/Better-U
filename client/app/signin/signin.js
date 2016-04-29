angular.module('myApp.signin', ['factories'])

.controller('SigninCtrl', function ($scope, $state, authFactory) {
  $scope.alert = function () {
    console.log('logged')
  }

  $scope.goSignup = function(){
 	 $state.go('signup');
  }
  $scope.login = function () {
  	authFactory.signIn($scope.user.name, $scope.user.password)
  	.then(function(data){
  		console.log(data);
  	})
  }
})
