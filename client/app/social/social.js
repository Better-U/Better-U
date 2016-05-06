angular.module('myApp.social', ['btford.socket-io', 'myApp.socialFactoryModule'])
  .controller('socialCtrl', function ($scope, socialFactory, $state, $cookies, socket) {
    $scope.savedAddress
    $scope.roomNumber
    $scope.user = $cookies.get('username')
    $scope.chatList
    $scope.random = function(){
      alert("Hello there")
    }
    $scope.sendCity = function () {
      socialFactory.updateZip($scope.user, $scope.address)
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
        .then(function (data) {
          socket.emit('joinRoom', {username1: $scope.user, username2: username})
        })
    }

    $scope.joinRoom = function (username) {
      socket.emit('joinRoom', {username1: $scope.user, username2: username})
    }
    socket.on('roomNumber', function (data) {
      $scope.roomNumber = data.roomNumber
    })

    var currentRoom = socialFactory.giveRoom()
    $scope.messages = []
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
    socket.on('message', function (data) {
      console.log('message received hopefully from room 10', data)
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
