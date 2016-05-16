angular.module('myApp.calculations', [])

  .controller('calculationsCtrl', function ($scope, AuthFactory, $cookies) {
    $scope.userData = null

    $scope.getUserData = function () {
      AuthFactory.getProfile($cookies.get('username'))
        .then(function (data) {
          $scope.userData = data.data[0]
        })
    }

    $scope.userBMI = function (height, weight) {
      var bmiHeight = Number(height)
      var bmiWeight = Number(weight)
      if (weight > 0 && height > 0) {
        var BMI = ((weight / (height * height)) * 703.06957964).toFixed(2)
      }
      return BMI
    }

    $scope.categorize = function (height, weight) {
      var bmi2 = $scope.userBMI(height, weight)
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

    $scope.calorieBurn = function (gender, age, weight, height, activity) {
      console.log('inside calorie burn formula')
      var numAge = Number(age)
      var numWeight = Number(weight)
      var numHeight = Number(height)
      console.log('activity: ', activity)
      var total
      if (gender == 0) {
        var maleBMR = 66.5 + (6.23 * numWeight) + (12.7 * numHeight) - (6.8 * numAge)
        if (activity === 'sedentary') {
          total = (maleBMR * 1.2).toFixed()
        } else if (activity === 'light') {
          total = (maleBMR * 1.375).toFixed()
        } else if (activity === 'moderate') {
          total = (maleBMR * 1.55).toFixed()
        } else if (activity === 'active') {
          total = (maleBMR * 1.725).toFixed()
        }
      } else if (gender == 1) {
        var femaleBMR = 655.1 + (4.35 * numWeight) + (4.7 * numHeight) - (4.7 * numAge)
        if (activity === 'sedentary') {
          total = (femaleBMR * 1.2).toFixed()
        } else if (activity === 'light') {
          total = (femaleBMR * 1.375).toFixed()
        } else if (activity === 'moderate') {
          total = (femaleBMR * 1.55).toFixed()
        } else if (activity === 'active') {
          total = (femaleBMR * 1.725).toFixed()
        }
      }
      return total
    }

    $scope.userBMR = function (gender, age, weight, height) {
      var uAge = Number(age)
      var uWeight = Number(weight)
      var uHeight = Number(height)
      var BMR
      if (gender == 0) {
        BMR = (66.5 + (6.23 * uWeight) + (12.7 * uHeight) - (6.8 * uAge)).toFixed(2)
      } else if (gender == 1) {
        BMR = (655.1 + (4.35 * uWeight) + (4.7 * uHeight) - (4.7 * uAge)).toFixed(2)
      }
      return BMR
    }

    $scope.init = function () {
      $scope.getUserData()
    }

    $scope.init()
  })

