angular.module('myApp.goals', [])

  .controller('GoalsCtrl', function ($scope, GoalsFactory, $cookies, $state) {
    $scope.cardioSelected = false
    $scope.strengthSelected = false
    $scope.nutritionSelected = false
    $scope.added = false
    $scope.disabled = false

    $scope.selectGoal = function (type) {
      if (type === 'cardio') {
        $scope.cardioSelected = true
        $scope.strengthSelected = false
        $scope.nutritionSelected = false
      } else if (type === 'strength') {
        $scope.cardioSelected = false
        $scope.strengthSelected = true
        $scope.nutritionSelected = false
      } else if (type === 'nutrition') {
        $scope.cardioSelected = false
        $scope.strengthSelected = false
        $scope.nutritionSelected = true
      }
    }

    $scope.submitCardio = function (date, intensity, category, value, measurement) {
      var username = $cookies.get('username')
      if (!date || !intensity || !category || !value || !measurement) {
        console.log('Form not valid')
      } else {
        GoalsFactory.postLog('cardio', date, intensity, category, value, measurement, username)
          .then(function (data) {
            swal('Cardio Goal Saved!', 'Navigate to the Dashboard to see your logs!', 'success')
            $state.reload()
          })
      }

    }

    $scope.submitStrength = function (date, intensity, category, value, measurement) {
      var username = $cookies.get('username')
      if (!date || !intensity || !category || !value || !measurement) {
        console.log('Form not valid')
      } else {
        GoalsFactory.postLog('strength', date, intensity, category, value, measurement, username)
          .then(function (data) {
            swal('Strength Goal Saved!', 'Navigate to the Dashboard to see your logs!', 'success')
            $state.reload()
          })
      }
    }

    $scope.submitNutrition = function (date, intensity, category, value, measurement) {
      var username = $cookies.get('username')
      if (!date || !intensity || !category || !value || !measurement) {
        console.log('Form not valid')
      } else {
        GoalsFactory.postLog('nutrition', date, intensity, category, value, measurement, username)
          .then(function (data) {
            swal('Nutrition Goal Saved!', 'Navigate to the Dashboard to see your logs!', 'success')
            $state.reload()
          })
      }
    }

  })
  .directive('cardioGoals', function () {
    return {
      templateUrl: 'app/goals/directives/cardio-goals.html',
      controller: 'GoalsCtrl'
    }
  })

  .directive('strengthGoals', function () {
    return {
      templateUrl: 'app/goals/directives/strength-goals.html',
      controller: 'GoalsCtrl'
    }
  })

  .directive('nutritionGoals', function () {
    return {
      templateUrl: 'app/goals/directives/nutrition-goals.html',
      controller: 'GoalsCtrl'
    }
  })
