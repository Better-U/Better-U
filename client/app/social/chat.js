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
    socket.on('notification', function(message){
      notifyMe(message.username, message.message)
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

    function notifyMe(user,message) {
      console.log("notify me is called")
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }
  // Let's check if the user is okay to get some notification
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
  var options = {
        body: message,
        dir : "ltr"
    };
  var notification = new Notification(user + " Posted a comment",options);
  }
  // Otherwise, we need to ask the user for permission
  // Note, Chrome does not implement the permission static property
  // So we have to check for NOT 'denied' instead of 'default'
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // Whatever the user answers, we make sure we store the information
      if (!('permission' in Notification)) {
        Notification.permission = permission;
      }
      // If the user is okay, let's create a notification
      if (permission === "granted") {
        var options = {
                body: message,
                dir : "ltr"
        };
        var notification = new Notification(user + " Posted a comment",options);
      }
    });
  }
}
  })
  .directive('scroll', function($timeout){
    return {
      restrict: 'A',
      link: function(scope, element, attr){
          scope.$watchCollection(attr.scroll, function(newVal){
            $timeout(function(){
              element[0].scrollTop = element[0].scrollHeight;
            })
          })
      }
    }
  })
