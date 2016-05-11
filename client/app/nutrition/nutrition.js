angular.module('myApp.nutrition', ['factories'])

  .controller('NutritionCtrl', function ($state, $http, $scope, NutritionFactory, $cookies, $uibModal) {
    var user = $cookies.get('username')
    $scope.foodData = null

    $scope.getFoodLog = function (user) {
      NutritionFactory.getFoodLog(user)
      .then(function (data) {
        $scope.foodData = data.data
      })
    }

    $scope.inputNutrition = function () {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/nutrition/nutritionModal.html',
        controller: 'NutritionModalCtrl',
        windowClass: 'app-modal-window'
      })
    }

    $scope.getFoodLog(user)
    // jQuery fixed tooltips
    $(function () {
      $("[data-toggle='tooltip']").tooltip()
    })
  })
