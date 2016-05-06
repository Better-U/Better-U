angular.module('myApp.nutrition', ['factories'])

  .controller('NutritionCtrl', function ($http, $scope, nutritionFactory, $cookies) {
    $scope.food = {query: '', results: []}
    $scope.submitFoodLog = function () {
      console.log('inside foodlog')
      nutritionFactory.submitFoodLog($cookies.get('username'), $scope.log.name, $scope.log.date, $scope.log.time, $scope.log.serving, $scope.log.cal, $scope.log.carbs, $scope.log.fat, $scope.log.fiber, $scope.log.sodium, $scope.log.protein, $scope.log.water)
        .then(function (data) {
          console.log('data inside submitFoodLog', data)
        })
    }

    $scope.searchFoodDB = function (query) {
      nutritionFactory.searchFoodDB(query)
      .then(function (data) {
        $scope.food.results = data.data.hits
        console.log('$scope.food.results =', $scope.food.results)
        return $scope.food.results
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
  })
