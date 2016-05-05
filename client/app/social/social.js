angular.module('myApp.social', ['btford.socket-io', 'myApp.socialFactoryModule'])
  .controller('socialCtrl', function ($scope, socialFactory, $state, $cookies) {
    $scope.savedAddress
    $scope.user = $cookies.get('username')
    $scope.sendCity = function () {
      socialFactory.updateZip($scope.user,	 $scope.address)
        .then(function () {
          $scope.savedAddress = $scope.address
          console.log('zipcode successfully updated')
          $scope.address = ''
        })
    }
    $scope.userList = []
    $scope.findPeople = function (zipcode) {
      socialFactory.findPeople(zipcode)
        .then(function (data) {
          $scope.userList = data.data
          if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
            $scope.$apply()
          }
        })
    }

    $scope.chatWithUser = function (username) {
      console.log(username)
      socialFactory.newChat($scope.user, username)
        .then(function(data){
        	console.log(data)
        })
      $state.go('chatRoom')
    }
  })