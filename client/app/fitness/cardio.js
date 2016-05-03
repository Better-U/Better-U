angular.module('myApp.cardio', ['factories'])

  .controller('CardioCtrl', function ($scope, cardioFactory, authFactory) {
    console.log('this is username for cardio: ' ,authFactory.userData.username)

    $scope.cardioList = function () {
      cardioFactory.getCardio(authFactory.userData.username).then(function (data) {
        console.log('cardioList called')
      })
    }

    $scope.convertSeconds = function (minutes) {
      var seconds = minutes * 60
      return seconds
      console.log('minutes converted to seconds: ', seconds)
    }

    $scope.pace = function (duration, distance) {
      if(duration === undefined || distance === undefined) {
        return 0
      } else {
        return (($scope.convertSeconds(duration) / distance) / 60).toFixed(2)
      }
    }

    $scope.convertMiles = function (meters) {
      if(meters > 0) {
        var convert = meters * 0.000621371
        return convert.toFixed(2)
      } else {
        return 0
      }
    }

    $scope.submitCardio = function () {
      var pace = $scope.pace($scope.duration, $scope.distance)
      cardioFactory.submitCardio(authFactory.userData.username, $scope.date, $scope.type, $scope.distance, $scope.duration, pace, $scope.intensity)
        .then(function (data) {
          console.log('cardio data logged: ', data)
        })
    }
  })
