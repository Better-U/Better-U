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
    $scope.chattingWith;
    socialFactory.getUserCity($scope.user)
      .then(function(data){
        console.log(data)
        $scope.savedAddress = data.data
      })

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
        socialFactory.updateZip($scope.user, geocoded)
        .then(function () {
          $scope.savedAddress = geocoded
          console.log('zipcode successfully updated', geocoded)
          $scope.findPeople(geocoded)
          $scope.address = ''
          $scope.validAddress = true;
        })

          })
      } else {
        console.log("inside if statement")

        maps.geocode($scope.address)
          .then(function(data){
            if(data.length < 1){
              geocoded = false;
              $scope.validAddress = false
              return
            }
            geocoded = data[0].address_components[0].long_name
            $scope.validAddress = true
            console.log(geocoded)
        socialFactory.updateZip($scope.user, geocoded)
        .then(function () {
          $scope.savedAddress = geocoded
          console.log('zipcode successfully updated')
          $scope.findPeople(geocoded)
          $scope.address = ''
        })

          })
      }
      

    }
    $scope.userList = []
    $scope.findPeople = function (city) {
      socialFactory.findPeople($scope.user, city)
        .then(function (data) {
          $scope.userList = data.data
          console.log(data.data)
          if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
            $scope.$apply()
          }
        })
    }

    $scope.chatWithUser = function (username) {
      console.log(username)
      $scope.searchPage = true
      $scope.chattingWith = username
      socialFactory.newChat($scope.user, username)
        .then(function (data) {
          socket.emit('joinRoom', {username1: $scope.user, username2: username})
        })
    }

    $scope.joinRoom = function (username) {
       $scope.searchPage = true
       $scope.chattingWith = username
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

    $scope.wrapperToggler = {toggled: false};
      $scope.displayChats = function(){
        console.log("displaying chats displayed/closed")
        $scope.wrapperToggler.toggled = !$scope.wrapperToggler.toggled
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
