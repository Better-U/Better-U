angular.module('factories', [])
.factory('authFactory', function($http){

	function signUp(username, password){
		var form = {
			username: username,
			password: password
		}
		console.log("inside authFactory signup", form);
		return $http.post('/api/users/signup', form)
	}

	return {
		signUp: signUp
	}
})