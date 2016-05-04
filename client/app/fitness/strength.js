angular.module('myApp.strength', ['factories'])
  .controller('StrengthCtrl', function ($scope, authFactory, strengthFactory, $cookies, profileFactory) {
    // console.log('this is username: ',authFactory.userData.username)
    $scope.strengthList = []
    $scope.user = $cookies.get('username')

    $scope.getStrengthProfile = function () {
      profileFactory.getProfile($scope.user)
        .then(function (data) {
          $scope.display = data.data[0]
        })
        .then(
          strengthFactory.getStrength($scope.user)
            .then(function (data) {
              $scope.strengthList = data.data
            })
        )
    }
    $scope.getStrengthProfile()

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
          $scope.getStrengthProfile()
        })
    }

    $scope.convert_feet = function (inches) {
      var feet = Math.floor(inches / 12)
      var inch = inches - feet * 12
      var tall = feet + '\'' + inch
      return tall
    }

    $scope.onerepmax = function (weight, reps) {
      return (weight * (1 + (reps / 30))).toFixed(1)
    }

    $scope.bmi = function (height_in, weight_lb) {
      if (weight_lb > 0 && height_in > 0) {
        var bmi_result = (weight_lb / (height_in * height_in)) * 703.06957964
      }
      return bmi_result.toFixed(2)
    }

    $scope.categorize = function (height, weight) {
      var bmi2 = $scope.bmi(height, weight)
      var category
      if (bmi2 >= 30) {
        category = 'You got work to do!'
      }
      else if (bmi2 >= 25 && bmi2 < 29.99) {
        category = 'Time to exercise and eat right'
      }
      else if (bmi2 >= 18.5 && bmi2 < 24.99) {
        category = 'Looking good! Lets stay that way'
      }
      else if (bmi2 < 18.5) {
        category = 'Bulk up!'
      }
      return category
    }


  })
