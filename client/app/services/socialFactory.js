angular.module('myApp.socialFactoryModule', ['btford.socket-io'])
.factory('socialFactory', function($http){

	function updateZip(id, zipcode){
		var zipHolder = {
			id: id,
			zipcode: zipcode
		}
	return $http.post('/api/social/updateZip', zipHolder)
		
	}
	function findPeople(zipcode){
		return $http.post('/api/social/findPeople', {zipcode: zipcode})
	}

	return {
		updateZip: updateZip,
		findPeople: findPeople
	}
})
.factory('mySocket', function(socketFactory){
	console.log(socketFactory)
	return socketFactory()
})