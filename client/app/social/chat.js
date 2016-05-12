angular.module('chatModule', ['myApp.socialFactoryModule'])
  .controller('chatCtrl', function ($scope, socket, $cookies) {
    $scope.name = $cookies.get('username')

    $scope.messages = []
    $scope.chattingWith

    socket.on('messenger', function (message) {
      console.log('received message', message)
      $scope.messages.push(message)
      console.log($scope.messages)
    })

    socket.on('roomNumber', function (data) {
      $scope.roomNumber = data.roomNumber
    })

    socket.on('chatHistory', function (messages) {
      $scope.messages = JSON.parse(messages.messages[0].message)
    })

    $scope.sendMessage = function () {
      console.log('message send function called')
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
      $scope.message = ''
    }
  })
