angular.module('myApp.cardio', ['factories'])

  .controller('CardioCtrl', function ($scope, cardioFactory, authFactory) {
    console.log('this is username: ' ,authFactory.userData.username)

    $scope.cardioList = [
    {date: '01/02/2016', type: 'Swimming', distance: 155, duration: 30, pace: 3},
    {date: '01/02/2016', type: 'Running', distance: 200, duration: 40, pace: 3},
    {date: '01/02/2016', type: 'Walking', distance: 125, duration: 50, pace: 3}
    ]

    $scope.convertSeconds = function (minutes) {
      var seconds = minutes * 60
      console.log('this is seconds: ', seconds)
      return seconds
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
      cardioFactory.submitCardio($scope.date, $scope.type, $scope.distance, $scope.duration, pace, $scope.intensity)
        .then(function (data) {
          console.log('cardio data logged: ', data)
        })
    }
  })
