angular.module('myApp.nutrition', ['factories'])

  .controller('NutritionCtrl', function ($scope, nutritionFactory, $cookies) {
    $scope.submitFoodLog = function () {
      console.log('inside foodlog')
      nutritionFactory.submitFoodLog($cookies.get('username'), $scope.log.name, $scope.log.date, $scope.log.time, $scope.log.serving, $scope.log.cal, $scope.log.carbs, $scope.log.fat, $scope.log.fiber, $scope.log.sodium, $scope.log.protein, $scope.log.water)
        .then(function (data) {
          console.log('data inside submitFoodLog', data)
        })
    }
  })
