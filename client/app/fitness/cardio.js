angular.module('myApp.cardio', ['factories'])

  .controller('CardioCtrl', function ($scope, cardioFactory) {
    $scope.cardioList = [
    {date: '01/02/2016', type: 'Swimming', distance: 155, duration: 30, pace: 3},
    {date: '01/02/2016', type: 'Running', distance: 200, duration: 40, pace: 3},
    {date: '01/02/2016', type: 'Walking', distance: 125, duration: 50, pace: 3}
    ]
    $scope.convertSeconds = function (minutes) {
      console.log('this is minutes: ', minutes)
      var seconds = (minutes * 60) / 100
      return seconds
    }

    $scope.pace = function (duration, distance) {
      return (distance / $scope.convertSeconds(duration)).toFixed(2)
    }

    $scope.convertMiles = function (meters) {
      if(meters > 0) {
        var convert = meters * 0.000621371
      }
      return convert.toFixed(2)
    }

    $scope.submitCardio = function () {
      console.log('cardio type ', $scope.type)
      cardioFactory.submitCardio($scope.date, $scope.type, $scope.distance, $scope.duration, $scope.pace, $scope.intensity)
        .then(function (data) {
          console.log('cardio data logged: ', data)
        })
    }
  })
