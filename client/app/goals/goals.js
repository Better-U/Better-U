angular.module('myApp.goals', [])

.controller('GoalsCtrl', function($scope, GoalsFactory, $cookies, $state) {
  $scope.cardioSelected = false
  $scope.strengthSelected = false
  $scope.nutritionSelected = false
  $scope.added = false
  
  $scope.selectGoal = function(type) {
    if (type === "cardio") {
      $scope.cardioSelected = true
      $scope.strengthSelected = false
      $scope.nutritionSelected = false
    } else if (type === "strength") {
      $scope.cardioSelected = false
      $scope.strengthSelected = true
      $scope.nutritionSelected = false
    } else if (type === "nutrition") {
      $scope.cardioSelected = false
      $scope.strengthSelected = false
      $scope.nutritionSelected = true
    }
  }

  $scope.submitCardio = function (date, intensity, category, value, measurement) {
    console.log('inside submit cARDio')
    var username = $cookies.get('username')
    console.log('inside submit cardio username', username)
    GoalsFactory.postLog('cardio', date, intensity, category, value, measurement, username)
      .then(function(data) {
        console.log('data submitted to database', data)
        $state.go('dashboard')
      })
  }

  $scope.submitStrength = function (date, intensity, category, value, measurement) {
    var username = $cookies.get('username')
    GoalsFactory.postLog('strength', date, intensity, category, value, measurement, username)
      .then(function(data) {
        console.log('data submitted to database', data)
        $scope.added = true
        console.log($scope.added)
      })
  }

  $scope.submitNutrition = function (date, intensity, category, value, measurement) {
    var username = $cookies.get('username')
    GoalsFactory.postLog('nutrition', date, intensity, category, value, measurement, username)
      .then(function(data) {
        console.log('data submitted to database', data)
        $state.go('dashboard')
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
