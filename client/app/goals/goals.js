angular.module('myApp.goals', [])

.controller('GoalsCtrl', function($scope) {
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