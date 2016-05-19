angular.module('myApp.nutrition', [])

  .controller('NutritionCtrl', function ($state, $http, $scope, NutritionFactory, $cookies, $uibModal) {
    $scope.foodData = []

    $scope.getFoodLog = function (user) {
      NutritionFactory.getFoodLog(user)
      .then(function (data) {
        $scope.foodData = data.data
      })
    }

    $scope.inputNutrition = function () {
      $uibModal.open({
        animation: true,
        templateUrl: 'app/nutrition/nutritionModal.html',
        controller: 'NutritionModalCtrl',
        windowClass: 'app-modal-window'
      })
    }

    $scope.init = function () {
      $scope.getFoodLog($cookies.get('username'))
    }

    $scope.init()
  })
