angular.module('myApp.socialFactoryModule', ['btford.socket-io'])
  .factory('socialFactory', function ($http) {
    function updateZip (id, zipcode) {
      var zipHolder = {
        id: id,
        zipcode: zipcode
      }
      return $http.post('/api/social/updateZip', zipHolder)
    }
    function findPeople (zipcode) {
      return $http.post('/api/social/findPeople', {zipcode: zipcode})
    }

    return {
      updateZip: updateZip,
      findPeople: findPeople
    }
  })
  .factory('socket', function ($rootScope) {
    var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
  })
