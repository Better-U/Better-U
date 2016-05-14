angular.module('myApp.goalsModal', [])

  .controller('goalsCtrl', function ($scope, AuthFactory, GoalsFactory, $cookies, $state, $uibModal) {
    $scope.animationsEnabled = true
    $scope.added = false
    $scope.disabled = false
    $scope.userData = []
    
    $scope.inputGoal = function () {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/dashboard/sub-views/goals/goals-modal.html',
        controller: 'selectGoalCtrl'
      })
    }

    $scope.getUserData = function () {
      AuthFactory.getProfile($cookies.get('username'))
        .then(function (data) {
          $scope.userData = data.data[0]
          $scope.getGoals()
        })
    }

    $scope.getGoals = function () {
      GoalsFactory.getLog($scope.userData.username)
        .then(function (data) {
          // console.log('data goals: ', data)
          $scope.goalsData = data.data.data
          // console.log($scope.goalsData)
        })
    }

    $scope.removeLog = function (id) {
      GoalsFactory.checkBets($scope.userData.username)
        .then(function (data) {
          console.log('this is dat from remove goal log: ', data.data.data)
          if (data.data.data.length === 0) {
            GoalsFactory.removeLog(id)
              .then(function (data) {
                swal('Goal successfully removed!')
                $state.reload()
              })
          } else {
            swal('Someone has bet on you', 'Keep going!', 'warning')
          }
        })
    }


    $scope.dateConverter = function (dateStr) {
      var date = new Date(dateStr)
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

      return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    }

    $scope.shortDateConverter = function (dateStr) {
      var date = new Date(dateStr)

      return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear())
    }

    $scope.goalPercentage = function (current, max) {
      return Math.floor(current / max * 100)
    }

    $scope.goalOverdue = function (input) {
      return new Date() - new Date(input) > 0
    }

    $scope.achieved = function (value, max) {
      return value === max
    }

    $scope.init = function () {
      $scope.getUserData()
    }

    $scope.init()

  })

