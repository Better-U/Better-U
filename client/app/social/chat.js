angular.module('myApp.chatModule', ['myApp.socialFactoryModule'])
  .controller('chatCtrl', function ($scope, socket, $cookies, $state, $stateParams, socialFactory) {
    var currentRoom = socialFactory.giveRoom()
    $scope.messages = []
    $scope.name = $cookies.get('username')

    socket.emit('joinRoom', {username1: 'arm', username2: 'pikachu123'})
    socket.on('message', function (data) {
      console.log('message received hopefully from room 10', message)
    })
    socket.on('init', function () {})
    socket.on('send:message', function (message) {
      $scope.messages.push(message)
      console.log('message received', message)
    })

    socket.on('change:name', function (data) {
      changeName(data.oldName, data.newName)
    })

    // add a message to the conversation when a user disconnects or leaves the room

    $scope.sendMessage = function () {
      console.log('sending message')
      socket.emit('send:message', {
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
