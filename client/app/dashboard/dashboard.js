angular.module('myApp.dashboard', [])

  .controller('DashboardCtrl', function ($scope, $state, GoalsFactory, $cookies, profileFactory) {
    var user = $cookies.get('username')
    console.log('this is profile data: ', profileFactory.getProfile(user))

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
          console.log('this is getProfile data: ', data.data[0].activitylvl)
        })
    }
    $scope.getDashboardProfile()

    $scope.calorieBurn = function (gender, age, weight, height, activity) {
      var numAge = Number(age)
      var numWeight = Number(weight)
      var numHeight = Number(height)
      var total
      if (gender == 0) {
        var maleBMR = 66.5 + (6.23 * weight) + (12.7 * height) - (6.8 * age)
        if (activity === 'sendentary') {
          total = (maleBMR * 1.2).toFixed(2)
        } else if (activity === 'light') {
          total = (maleBMR * 1.375).toFixed(2)
        } else if (activity === 'moderate') {
          total = (maleBMR * 1.55).toFixed(2)
        } else if (activity === 'active') {
          total = (maleMBR * 1.725).toFixed(2)
        }
      } else if (gender == 1) {
        var femaleBMR = 655.1 + (4.35 * numWeight) + (4.7 * numHeight) - (4.7 * numAge)
        if (activity === 'sendentary') {
          total = (femaleBMR * 1.2).toFixed(2)
        } else if (activity === 'light') {
          total = (femaleBMR * 1.375).toFixed(2)
        } else if (activity === 'moderate') {
          total = (femaleBMR * 1.55).toFixed(2)
        } else if (activity === 'active') {
          total = (femaleBMR * 1.725).toFixed(2)
        }
      }
      return total
    }

    $scope.userBMR = function (gender, age, weight, height) {
      var uAge = Number(age)
      var uWeight = Number(weight)
      var uRight = Number()
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

    $scope.goalOverdue = function (input) {
      return new Date() - new Date(input) > 0
    }

    $scope.getGoals()

  })
