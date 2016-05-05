angular.module('myApp.strength', ['factories'])
  .controller('StrengthCtrl', function ($scope, authFactory, strengthFactory, $cookies, profileFactory) {
    $scope.user = $cookies.get('username')

    $scope.getStrengthProfile = function () {
      profileFactory.getProfile($scope.user)
        .then(function (data) {
          $scope.display = data.data[0]
        })
        .then(function () {
          fetchLog()
        })
        .then(function () {
          renderGraphs()
        })
    }

    $scope.getStrengthProfile()

    const fetchLog = function () {
      strengthFactory.getStrength($scope.user)
        .then(function (data) {
          $scope.strengthList = data.data
          console.log($scope.strengthList)
        })
    }

    const calc_duration = function (arr) {
      var duration = []
      for (var i = 0; i < arr.length; i++) {
        duration.push(arr[i].duration)
        console.log(duration)
      }
      return duration
    }

    const renderGraphs = function () {
      var options = {
        width: 1000,
        height: 400
      }

      new Chartist.Line('#chart1', {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        series: [[2, 56, 23, 65, 40, 25, 30]]
      }, options)

    // Initialize a Line chart in the container with the ID chart2
      new Chartist.Bar('#chart2', {
        labels: ['Bench', 'Squat', 'Deadlift', 'Shoulder Press', 'Lat Pulldown', 'Dumbbells', 'Clean & Jerk', 'Snatch'],
        series: [ [ 1, 2, 2, 3, 1, 20, 2, 1 ] ]
      }, options)
    }

    $scope.submitStrength = function () {
      strengthFactory.submitStrength(
        $scope.user,
        $scope.str.date,
        $scope.str.type,
        $scope.str.sets,
        $scope.str.intensity,
        $scope.str.duration,
        $scope.str.weight,
        $scope.str.reps
      )
        .then(function (data) {
          $scope.str = {}
          fetchLog()
        })
    }

    $scope.convert_feet = function (inches) {
      var feet = Math.floor(inches / 12)
      var inch = inches - feet * 12
      var tall = feet + "'" + inch
      return tall
    }

    $scope.onerepmax = function (weight, reps) {
      return (weight * (1 + (reps / 30))).toFixed(1)
    }
  })
