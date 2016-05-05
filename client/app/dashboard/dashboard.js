angular.module('myApp.dashboard', [])

  .controller('DashboardCtrl', function ($scope, $state, GoalsFactory, $cookies, profileFactory) {
    var user = $cookies.get('username')

    $scope.goalsData = null
    $scope.dash = null

    $scope.signout = function () {
      $cookies.remove('token')
      $cookies.remove('username')
      $state.go('landing')
    }

    $scope.getDashboardProfile = function () {
      profileFactory.getProfile(user)
        .then(function (data) {
          $scope.dash = data.data[0]
        })
    }
    $scope.getDashboardProfile()

    $scope.userBMI = function (height, weight) {
      var bmiHeight = Number(height)
      var bmiWeight = Number(weight)
      if (weight> 0 && height > 0) {
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
      var numAge = Number(age)
      var numWeight = Number(weight)
      var numHeight = Number(height)
      var total
      if (gender == 0) {
        var maleBMR = 66.5 + (6.23 * numWeight) + (12.7 * numHeight) - (6.8 * numAge)
        if (activity === 'sendentary') {
          total = (maleBMR * 1.2).toFixed()
        } else if (activity === 'light') {
          total = (maleBMR * 1.375).toFixed()
        } else if (activity === 'moderate') {
          total = (maleBMR * 1.55).toFixed()
        } else if (activity === 'active') {
          total = (maleMBR * 1.725).toFixed()
        }
      } else if (gender == 1) {
        var femaleBMR = 655.1 + (4.35 * numWeight) + (4.7 * numHeight) - (4.7 * numAge)
        if (activity === 'sendentary') {
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

    $scope.removeLog = function (id) {
      console.log(id)
      GoalsFactory.removeLog(id)
        .then(function(data) {
          console.log('successful delete', data)
          // swal("Goal successfully removed!")
          $state.reload()
        })
    }

    $scope.getGoals = function () {
      var username = $cookies.get('username')
      GoalsFactory.getLog(username)
        .then(function(data) {
          $scope.goalsData = data.data.data
          console.log($scope.goalsData)
        })
    }

    $scope.dateConverter = function (dateStr) {
      var date = new Date(dateStr)
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

      return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    }

    $scope.goalPercentage = function (current, max) {
      return Math.floor(current/max * 100)
    }

    $scope.goalOverdue = function (input) {
      console.log(new Date(input))
      console.log(new Date() - new Date(input) < 0)
      return new Date() - new Date(input) > 0
    }
    
    $scope.achieved = function (value, max) {
      return value === max
    }

    $scope.getGoals()

  })
