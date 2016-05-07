angular.module('myApp.social', ['btford.socket-io', 'myApp.socialFactoryModule'])
  .controller('socialCtrl', function ($scope, socialFactory, $state, $cookies, socket, maps) {
    $scope.savedAddress
    $scope.roomNumber
    $scope.user = $cookies.get('username')
    $scope.chatList
    $scope.messages = []
    $scope.searchPage = false;
    $scope.gPlace
    $scope.validAddress = true;
    $scope.searching = function(){
      console.log('searching is called')
      $scope.searchPage = false
      maps.geocode('90401')
        .then(function(data){
          console.log(data)
        })
    }
    $scope.sendCity = function () {
      var geocoded;
      if($scope.address === ''){
        return
      }

      console.log(isNaN(+$scope.address), $scope.address, +$scope.address)
      if(isNaN(+$scope.address.slice(0,5)) === false){
        console.log("inside if number statement")
        maps.geocode($scope.address.toString())
          .then(function(data){
            console.log(data[0].address_components[1])
            geocoded = data[0].address_components[1].long_name
          })
      } else {
        console.log("inside if statement")

        maps.geocode($scope.address)
          .then(function(data){
            console.log(data[0].address_components[0])
            geocoded = data[0].address_components[0].long_name
            if(isNaN(+geocoded) === true) {
              geocoded = false
            }
          })
      }
      console.log(geocoded)

      if(!geocoded){
        $scope.validAddress = false
        return
      }
      console.log(geocoded)
      $scope.validAddress = true

      // socialFactory.updateZip($scope.user, geocoded)
      //   .then(function () {
      //     $scope.savedAddress = geocoded
      //     console.log('zipcode successfully updated')
      //     $scope.findPeople($scope.address)
      //     $scope.address = ''
      //   })
    }
    $scope.userList = []
    $scope.findPeople = function (city) {
      socialFactory.findPeople($scope.user, city)
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
