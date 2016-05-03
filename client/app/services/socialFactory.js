angular.module('myApp.socialFactoryModule', [])
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