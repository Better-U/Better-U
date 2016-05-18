angular.module('myApp.nutritionModal', [])

  .controller('NutritionModalCtrl', function ($scope, $state, $http, AuthFactory, NutritionFactory, $cookies, $uibModal) {
    $scope.food = {query: ''}
    $scope.results = []

    $scope.format = 'dd-MMMM-yyyy'

    $scope.open1 = function () {
      $scope.popup1.opened = true
    }

    $scope.clear = function () {
      $scope.date = null
    }

    $scope.popup1 = {
      opened: false
    }

    $scope.submitFoodLog = function () {
      NutritionFactory.submitFoodLog($cookies.get('username'), $scope.log.name, $scope.date, $scope.log.time, $scope.log.serving, $scope.log.size, $scope.log.cal, $scope.log.carbs, $scope.log.fat, $scope.log.fiber, $scope.log.sodium, $scope.log.protein, $scope.log.water)
      .then(function (data) {
        swal('Nutritional Facts Saved!', 'Click OK to input another item.', 'success')
        $scope.log = {}
        $scope.asyncSelected = ''
        $scope.results = []
        $state.reload()
      })
    }

    $scope.searchFoodDB = function (query) {
      NutritionFactory.searchFoodDB(query)
      .then(function success (data) {
        $scope.results = data.data.hits
        return $scope.results
      }, function errorCallback (resp) {
        console.log('Error:', resp)
      })
    }

    $scope.getNutrition = function (item) {
      NutritionFactory.getNutrition(item)
      .then(function (data) {
        var item = data.data
        $scope.log = {name: item.item_name,
                      serving: item.nf_serving_size_qty,
                      size: item.nf_serving_size_unit,
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
  .directive('datepickerLocaldate', ['$parse', function ($parse) {
    var directive = {
      restrict: 'A',
      require: ['ngModel'],
      link: link
    }
    return directive

    function link (scope, element, attr, ctrls) {
      var ngModelController = ctrls[0]
      // called with a JavaScript Date object when picked from the datepicker
      ngModelController.$parsers.push(function (viewValue) {
        // undo the timezone adjustment we did during the formatting
        viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset())
        // we just want a local date in ISO format
        return viewValue.toISOString().substring(0, 10)
      })

        // called with a 'yyyy-mm-dd' string to format
      ngModelController.$formatters.push(function (modelValue) {
        if (!modelValue) {
          return undefined
        }
        // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
        var dt = new Date(modelValue)
        // 'undo' the timezone offset again (so we end up on the original date again)
        dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset())
        return dt
      })
    }
  }])
