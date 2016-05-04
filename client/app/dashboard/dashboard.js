angular.module('myApp.dashboard', [])

  .controller('DashboardCtrl', function ($scope, $state, GoalsFactory, $cookies, profileFactory) {
    var user = $cookies.get('username')
    console.log('this is profile data: ', profileFactory.getProfile(user))

    $scope.goalsData = null
    $scope.display = null

    $scope.signout = function () {
      $cookies.remove('token')
      $cookies.remove('username')
      $state.go('landing')
    }

    $scope.getDashboardProfile = function () {
      profileFactory.getProfile(user)
        .then(function (data) {
          $scope.display = data.data
          console.log('this is getProfile data: ', data.data)
        })
    }
    $scope.getDashboardProfile()

    // $scope.calorieBurn = function (gender, age, weight, height, activity) {

    // }

    $scope.removeLog = function (id) {
      console.log(id)
      GoalsFactory.removeLog(id)
        .then(function(data) {
          console.log('successful delete', data)
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
