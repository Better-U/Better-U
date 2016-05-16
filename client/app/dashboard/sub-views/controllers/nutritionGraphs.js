angular.module('myApp.nutritionGraphs', [])

  .controller('nutritionGraphsCtrl', function ($scope, NutritionFactory, AuthFactory, $cookies) {
    $scope.userData = null
    $scope.nutritionData = null

    $scope.todaysPieData = function () {
      $scope.todayNutritionPie = {
        today: null,
        calories: 0,
        protein: 0
      }

      var today = new Date()
      if ($scope.todayNutritionPie.today === null) {
        $scope.todayNutritionPie.today = new Date()
      } else if ($scope.todayNutritionPie.today.getDate() !== today.getDate() &&
        $scope.todayNutritionPie.today.getMonth() !== today.getMonth() &&
        $scope.todayNutritionPie.today.getFullYear() !== today.getFullYear() &&
        $scope.todayNutritionPie.today !== null) {
        $scope.todayNutritionPie.today = new Date()
        $scope.todayNutritionPie.calories = 0
        $scope.todayNutritionPie.protein = 0
      }

      for (var i = 0; i < $scope.nutritionData.length; i++) {
        var logDate = new Date($scope.nutritionData[i].date)
        if (logDate.getMonth() === today.getMonth() &&
          logDate.getDate() === today.getDate() &&
          logDate.getFullYear() === today.getFullYear()) {
          $scope.todayNutritionPie.calories += Number($scope.nutritionData[i].cal)
          $scope.todayNutritionPie.protein += Number($scope.nutritionData[i].protein)
        }
      }
      console.log('today nutrition pie:', $scope.todayNutritionPie)
      return $scope.todayNutritionPie
    }

    $scope.shortDateConverter = function (dateStr) {
      var date = new Date(dateStr)

      return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear())
    }

    $scope.getPastSevenDays = function () {
      var today = new Date()
      var results = [$scope.shortDateConverter(today)]
      for (var i = 0; i < 6; i++) {
        var formattedDate = today.setDate(today.getDate() - 1)
        results.unshift($scope.shortDateConverter(formattedDate))
      }

      return results
    }

    $scope.getWater = function (data) {
      var pastDays = $scope.getPastSevenDays()
      var results = []
      var sum = 0
      for (var i = 0; i < pastDays.length; i++) {
        sum = 0
        for (var j = 0; j < data.length; j++) {
          if ($scope.shortDateConverter(data[j].date) === pastDays[i]) {
            sum += Number(data[j].water)
          }
        }
        results.push(sum)
      }
      $scope.waterIntake = results
      return $scope.waterIntake
    }

    $scope.convertWater = function (weight) {
      return Math.floor((weight * (2 / 3)) / 8)
    }

    $scope.getUserData = function () {
      AuthFactory.getProfile($cookies.get('username'))
        .then(function (data) {
          $scope.userData = data.data[0]
          $scope.getNutritionLogs()
        })
    }

    $scope.getNutritionLogs = function () {
      NutritionFactory.getFoodLog($cookies.get('username'))
        .then(function (data) {
          $scope.nutritionData = data.data
          $scope.getWater($scope.nutritionData)
          $scope.todaysPieData()
          $scope.createNutritionCharts()
        })
    }
    $scope.createNutritionCharts = function () {
      console.log('$scope waterintake', $scope.waterIntake)
      var chart = new Chartist.Pie('#water-intake-chart', {
        series: [$scope.waterIntake[6]],
        labels: [($scope.waterIntake[6]) + ' of ' + $scope.convertWater($scope.userData.weight) + ' cups']
      }, {
        donut: true,
        showLabel: true,
        total: $scope.convertWater($scope.userData.weight),
        chartPadding: 30,
        labelOffset: 50
      })
      chart.on('draw', function (data) {
        if (data.type === 'slice') {
          var pathLength = data.element._node.getTotalLength()

          data.element.attr({
            'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
          })

          var animationDefinition = {
            'stroke-dashoffset': {
              id: 'anim' + data.index,
              dur: 1000,
              from: -pathLength + 'px',
              to: '0px',
              easing: Chartist.Svg.Easing.easeOutQuint,
              fill: 'freeze'
            }
          }

          if (data.index !== 0) {
            animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end'
          }

          data.element.attr({
            'stroke-dashoffset': -pathLength + 'px'
          })

          data.element.animate(animationDefinition, false)
        }
      })
    }

    $scope.init = function () {
      $scope.getUserData()
    }

    $scope.init()
  })

