angular.module('myApp.cardio', ['factories'])
.controller('CardioCtrl', function ($scope, cardioFactory, authFactory, $cookies) {
    var user = $cookies.get('username')
    console.log('this is username: ', $cookies.get('username'))

    $scope.cardioData = null

    $scope.cardioList = function () {
      cardioFactory.getCardio(user).then(function (data) {

        $scope.cardioData = data.data
      })
    }

    $scope.pace = function (duration, distance) {
      if(duration === undefined || distance === undefined) {
        return 0
      } else {
        var convertSeconds = duration * 60
        var pace = ((convertSeconds / distance) / 60).toFixed(2)
        return pace
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
      cardioFactory.submitCardio(user, $scope.date, $scope.type, $scope.distance, $scope.duration, pace, $scope.intensity)
        .then(function () {
          console.log('cardio data logged')
          cardioFactory.getCardio(user).then(function (data) {
            console.log('cardio data updated', data)
            $scope.cardioData = data.data
            $scope.cardioList()
          })
        })
    }

    $scope.cardioList()
  })
