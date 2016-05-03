angular.module('myApp.nutrition', ['factories'])

  .controller('NutritionCtrl', function ($scope) {
    $scope.submitFoodLog = function () {
      console.log('inside foodlog')
    }

 })