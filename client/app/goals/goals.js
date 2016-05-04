angular.module('myApp.goals', [])

.controller('GoalsCtrl', function($scope, GoalsFactory, $cookies) {
  $scope.cardioSelected = false
  $scope.strengthSelected = false
  $scope.nutritionSelected = false
  
  $scope.selectGoal = function(type) {
    if (type === "cardio") {
      $scope.cardioSelected = true
      $scope.strengthSelected = false
      $scope.nutritionSelected = false
    } else if (type === "strength") {
      $scope.cardioSelected = false
      $scope.strengthSelected = true
      $scope.nutritionSelected = false
    } else {
      $scope.cardioSelected = false
      $scope.strengthSelected = false
      $scope.nutritionSelected = true
    }
  }

  $scope.submitCardio = function (date, intensity, category, value, measurement) {
    var username = $cookies.get('username')
    GoalsFactory.cardioLog('cardio', date, intensity, category, value, measurement, username)
      .then(function(data) {
        console.log('data submitted to database', data)
      })
  }

  $scope.submitStrength = function (date, intensity, category, value, measurement) {
    var username = $cookies.get('username')
    GoalsFactory.strengthLog('strength', date, intensity, category, value, measurement, username)
      .then(function(data) {
        console.log('data submitted to database', data)
      })
  }

  $scope.submitNutrition = function (date, intensity, category, value, measurement) {
    var username = $cookies.get('username')
    GoalsFactory.strengthLog('nutrition', date, intensity, category, value, measurement, username)
      .then(function(data) {
        console.log('data submitted to database', data)
      })
  }

})

.directive('cardioGoals', function() {
  return {
    templateUrl: 'app/goals/directives/cardio-goals.html',
    controller: 'GoalsCtrl'
  }
})

.directive('strengthGoals', function() {
  return {
    templateUrl: 'app/goals/directives/strength-goals.html',
    controller: 'GoalsCtrl'
  }
})

.directive('nutritionGoals', function() {
  return {
    templateUrl: 'app/goals/directives/nutrition-goals.html',
    controller: 'GoalsCtrl'
  }
})
