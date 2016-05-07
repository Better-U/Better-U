angular.module('myApp.nutrition', ['factories'])

  .controller('NutritionCtrl', function ($state, $http, $scope, nutritionFactory, $cookies) {
    var user = $cookies.get('username')
    $scope.food = {query: ''}
    $scope.results = []
    $scope.foodData = null
    $scope.submitFoodLog = function () {
      nutritionFactory.submitFoodLog($cookies.get('username'), $scope.log.name, $scope.log.date, $scope.log.time, $scope.log.serving, $scope.log.cal, $scope.log.carbs, $scope.log.fat, $scope.log.fiber, $scope.log.sodium, $scope.log.protein, $scope.log.water)
        .then(function (data) {
          $state.reload()
        })
    }

    $scope.searchFoodDB = function (query) {
      nutritionFactory.searchFoodDB(query)
      .then(function success (data) {
        $scope.results = data.data.hits
        console.log('$scope.results =', $scope.results)
        return $scope.results
      }, function errorCallback (resp) {
        console.log('Error:', resp)
      })
    }

    $scope.getNutrition = function (item) {
      nutritionFactory.getNutrition(item)
      .then(function (data) {
        var item = data.data
        $scope.log = {name: item.item_name,
                      serving: item.nf_serving_size_qty,
                      cal: item.nf_calories,
                      fat: item.nf_total_fat,
                      fiber: item.nf_dietary_fiber,
                      carbs: item.nf_total_carbohydrate,
                      sodium: item.nf_sodium,
                      protein: item.nf_protein
                     }
      })
    }

    $scope.getFoodLog = function (user) {
      nutritionFactory.getFoodLog(user)
      .then(function (data) {
        $scope.foodData = data.data
      })
    }

    $scope.getFoodLog(user)
  })
