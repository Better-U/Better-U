angular.module('myApp.social', ['btford.socket-io', 'myApp.socialFactoryModule'])
	.controller('socialCtrl', function($scope, socialFactory) {
		$scope.savedAddress
		$scope.sendCity = function() {
			socialFactory.updateZip(19, $scope.address)
				.then(function() {
					$scope.savedAddress = $scope.address
					console.log('zipcode successfully updated')
					$scope.address = '';
				})

		}

		$scope.userList = [];
		$scope.findPeople = function(zipcode){
			socialFactory.findPeople(zipcode)
			  .then(function(data){
			  	$scope.userList = data.data
			  	if($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest'){
			  		$scope.$apply()
			  	}
			  })
		}

		$scope.chatWithUser = function(username){
			console.log(username)
		}
	})