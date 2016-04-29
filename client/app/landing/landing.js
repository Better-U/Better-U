angular.module('myApp.landing', ['factories'])

  .controller('LandingCtrl', function ($scope, authFactory) {
    $scope.signUp = function () {
      console.log('signup button')
		 authFactory.signUp( $scope.user.name, $scope.user.password)
		 .then(function(data){
		 	console.log(data);
		 })
    
    }
  })
