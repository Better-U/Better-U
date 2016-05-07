angular.module('myApp.socialFactoryModule', ['btford.socket-io'])
  .factory('socialFactory', function ($http) {
    var roomNumber
    function updateZip (username, zipcode) {
      var zipHolder = {
        username: username,
        zipcode: zipcode
      }
      return $http.post('/api/social/updateZip', zipHolder)
    }
    function findPeople (username, zipcode) {
      return $http.post('/api/social/findPeople', {username:username, zipcode: zipcode})
    }
    function newChat (username1, username2) {
      console.log('newchatFacotyr being called')
      return new Promise(function (resolve) {
        $http.post('/api/social/newChat', {username1: username1, username2: username2})
          .then(function (data) {
            console.log(data.data.roomNumber)
            roomNumber = data.data.roomNumber
            resolve(data.data.roomNumber)
          })
      })
    }
    function giveRoom () {
      return roomNumber
    }
    return {
      updateZip: updateZip,
      findPeople: findPeople,
      newChat: newChat,
      giveRoom: giveRoom
    }
  })
  .factory('socket', function ($rootScope) {
    var socket = io.connect()
    return {
      on: function (eventName, callback) {
        socket.on(eventName, function () {
          var args = arguments
          $rootScope.$apply(function () {
            callback.apply(socket, args)
          })
        })
      },
      emit: function (eventName, data, callback) {
        socket.emit(eventName, data, function () {
          var args = arguments
          $rootScope.$apply(function () {
            if (callback) {
              callback.apply(socket, args)
            }
          })
        })
      }
    }
  })
  .factory('maps', ['$q', function ($q) {
var geocoder = new google.maps.Geocoder();
return {
    geocode: function (address) {
        var deferred = $q.defer();

        geocoder.geocode({
            'address': address
        }, function (results, status) {
            deferred.resolve(results);
        // Should also reject if AJAX errors.
        });

        return deferred.promise;
    }
  };
}]);
