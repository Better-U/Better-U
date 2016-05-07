angular.module('myApp.social', ['btford.socket-io', 'myApp.socialFactoryModule'])
  .controller('socialCtrl', function ($scope, socialFactory, $state, $cookies, socket, maps) {
    $scope.savedAddress
    $scope.roomNumber
    $scope.user = $cookies.get('username')
    $scope.chatList
    $scope.messages = []
    $scope.searchPage = false;
    $scope.gPlace
    $scope.searching = function(){
      console.log('searching is called')
      $scope.searchPage = false
      maps.geocode('90401')
        .then(function(data){
          console.log(data)
        })
    }
    $scope.sendCity = function () {
      if($scope.address === ''){
        return
      }
      socialFactory.updateZip($scope.user, $scope.address)
        .then(function () {
          $scope.savedAddress = $scope.address
          console.log('zipcode successfully updated')
          $scope.findPeople($scope.address)
          $scope.address = ''
        })
    }
    $scope.userList = []
    $scope.findPeople = function (zipcode) {
      socialFactory.findPeople($scope.user, zipcode)
        .then(function (data) {
          $scope.userList = data.data
          if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
            $scope.$apply()
          }
        })
    }

    $scope.chatWithUser = function (username) {
      console.log(username)
      $scope.searchPage = true
      socialFactory.newChat($scope.user, username)
        .then(function (data) {
          socket.emit('joinRoom', {username1: $scope.user, username2: username})
        })
    }

    $scope.joinRoom = function (username) {
       $scope.searchPage = true
      socket.emit('joinRoom', {username1: $scope.user, username2: username})
      $scope.messages = [];
    }
    socket.on('roomNumber', function (data) {
      $scope.roomNumber = data.roomNumber
      console.log($scope.roomNumber, "room again")
    })
    socket.on('chatHistory', function(messages){
      console.log(messages)
      $scope.messages = JSON.parse(messages.messages[0].message)
    })
    var currentRoom = socialFactory.giveRoom()
    $scope.name = $cookies.get('username')


    socket.on('init', function () {
      console.log('init received')
      socket.emit('listChats', {username: $scope.user})
    })
    socket.on('listChats', function(data){
      $scope.chatList = data
      console.log(data, "list of usernames I'm chatting with!")
    })
    socket.on('send:message', function (message) {
      $scope.messages.push(message)
      console.log('message received', message)
    })
    // add a message to the conversation when a user disconnects or leaves the room
    $scope.sendMessage = function () {
      console.log('sending message')
      socket.emit('send:message', {
        roomNumber: $scope.roomNumber,
        username: $scope.name,
        message: $scope.message
      })

      // add the message to our model locally
      $scope.messages.push({
        username: $scope.name,
        message: $scope.message
      })

      // clear message box
      $scope.message = ''
    }
  })
.directive('chat', function(){
  return {
    templateUrl: 'app/social/directives/chat.html',
    controller: 'socialCtrl'
  }
})
.directive('search', function(){
  return {
    templateUrl: 'app/social/directives/search.html',
    controller: 'socialCtrl'
  }
})
.directive('googleplace', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, model) {
            var options = {
                types: [],
                componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                scope.$apply(function() {
                    model.$setViewValue(element.val());                
                });
            });
        }
    };
});