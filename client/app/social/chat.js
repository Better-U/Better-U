angular.module('myApp.chatModule', ['myApp.socialFactoryModule'])
.controller('chatCtrl', function($scope, socket, $cookies){

	$scope.messages=[];
	$scope.name = $cookies.get('username')
socket.on('init', function (data) {
    console.log(data)
  });
  
  socket.on('hi', function(Data){
    console.log(Data, "hi received");
  })
  socket.on('send:message', function (message) {
    $scope.messages.push(message);
    console.log("message received", message)
  });

  socket.on('change:name', function (data) {
    changeName(data.oldName, data.newName);
  });

  socket.on('user:join', function (data) {
    $scope.messages.push({
      user: 'chatroom',
      text: 'User ' + data.name + ' has joined.'
    });
    $scope.users.push(data.name);
  });

  // add a message to the conversation when a user disconnects or leaves the room


  $scope.sendMessage = function () {
    console.log("sending message")
    socket.emit('send:message', {
		username: $scope.name,
        message: $scope.message
    });

    // add the message to our model locally
    $scope.messages.push({
      username: $scope.name,
      message: $scope.message
    });

    // clear message box
    $scope.message = '';
  }
})
