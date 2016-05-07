angular.module('myApp.dashboard', [])

  .controller('DashboardCtrl', function ($rootScope, $scope, $state, GoalsFactory, $cookies, profileFactory, nutritionFactory, $uibModal) {
    $scope.animationsEnabled = true
    $scope.username = $cookies.get('username')
    $rootScope.hideit = false
    $rootScope.landing = false
    $scope.waterIntake = null
    $rootScope.signout = function () {
      $scope.signout()
    }
    $scope.nutritionData = null


    var user = $cookies.get('username')

    $scope.goalsData = null
    $scope.dash = null

    $scope.signout = function () {
      $cookies.remove('token')
      $cookies.remove('username')
      $state.go('landing')
    }

    $scope.getDashboardProfile = function () {
      profileFactory.getProfile(user)
        .then(function (data) {
          $scope.dash = data.data[0]
        })
    }
    $scope.getDashboardProfile()

    $scope.userBMI = function (height, weight) {
      var bmiHeight = Number(height)
      var bmiWeight = Number(weight)
      if (weight > 0 && height > 0) {
        var BMI = ((weight / (height * height)) * 703.06957964).toFixed(2)
      }
      return BMI
    }

    $scope.categorize = function (height, weight) {
      var bmi2 = $scope.userBMI(height, weight)
      var category
      if (bmi2 >= 30) {
        category = 'You got work to do!'
      }
      else if (bmi2 >= 25 && bmi2 < 29.99) {
        category = 'Time to exercise and eat right'
      }
      else if (bmi2 >= 18.5 && bmi2 < 24.99) {
        category = 'Looking good! Lets stay that way'
      }
      else if (bmi2 < 18.5) {
        category = 'Bulk up!'
      }
      return category
    }

    $scope.calorieBurn = function (gender, age, weight, height, activity) {
      var numAge = Number(age)
      var numWeight = Number(weight)
      var numHeight = Number(height)
      var total
      if (gender == 0) {
        var maleBMR = 66.5 + (6.23 * numWeight) + (12.7 * numHeight) - (6.8 * numAge)
        if (activity === 'sendentary') {
          total = (maleBMR * 1.2).toFixed()
        } else if (activity === 'light') {
          total = (maleBMR * 1.375).toFixed()
        } else if (activity === 'moderate') {
          total = (maleBMR * 1.55).toFixed()
        } else if (activity === 'active') {
          total = (maleMBR * 1.725).toFixed()
        }
      } else if (gender == 1) {
        var femaleBMR = 655.1 + (4.35 * numWeight) + (4.7 * numHeight) - (4.7 * numAge)
        if (activity === 'sendentary') {
          total = (femaleBMR * 1.2).toFixed()
        } else if (activity === 'light') {
          total = (femaleBMR * 1.375).toFixed()
        } else if (activity === 'moderate') {
          total = (femaleBMR * 1.55).toFixed()
        } else if (activity === 'active') {
          total = (femaleBMR * 1.725).toFixed()
        }
      }
      return total
    }

    $scope.userBMR = function (gender, age, weight, height) {
      var uAge = Number(age)
      var uWeight = Number(weight)
      var uHeight = Number(height)
      var BMR
      if (gender == 0) {
        BMR = (66.5 + (6.23 * uWeight) + (12.7 * uHeight) - (6.8 * uAge)).toFixed(2)
      } else if (gender == 1) {
        BMR = (655.1 + (4.35 * uWeight) + (4.7 * uHeight) - (4.7 * uAge)).toFixed(2)
      }
      return BMR
    }

    $scope.removeLog = function (id) {
      GoalsFactory.removeLog(id)
        .then(function (data) {
          console.log('successful delete', data)
          // swal("Goal successfully removed!")
          $state.reload()
        })
    }

    $scope.inputGoal = function () {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/dashboard/dashGoalModal.html',
        // templateUrl: '/app/goals/goals.html',
        controller: 'GoalsCtrl'
      })
    }

    $scope.getGoals = function () {
      var username = $cookies.get('username')
      GoalsFactory.getLog(username)
        .then(function (data) {
          $scope.goalsData = data.data.data
          console.log($scope.goalsData)
        })
    }

    $scope.dateConverter = function (dateStr) {
      var date = new Date(dateStr)
      var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

      return days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear()
    }

    $scope.shortDateConverter = function (dateStr) {
      var date = new Date(dateStr)

      return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear())
    }

    $scope.goalPercentage = function (current, max) {
      return Math.floor(current / max * 100)
    }

    $scope.goalOverdue = function (input) {
      return new Date() - new Date(input) > 0
    }

    $scope.achieved = function (value, max) {
      return value === max
    }


    $scope.getPastSevenDays = function () {
      var today = new Date()
      var results = [$scope.shortDateConverter(today)]
      for (var i = 0; i < 6; i++) {
        formattedDate = today.setDate(today.getDate() - 1)
        results.unshift($scope.shortDateConverter(formattedDate))
      }

      console.log('results: ', results)
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


    $scope.todaysPieData = function () {
      $scope.todayNutritionPie = {
        today: null,
        fat: 0,
        carbs: 0,
        protein: 0
      }

      var today = new Date()
      if($scope.todayNutritionPie.today === null) {
        console.log('today is null')
        $scope.todayNutritionPie.today = new Date()
      } else if ($scope.todayNutritionPie.today.getDate() !== today.getDate() &&
                  $scope.todayNutritionPie.today.getMonth() !== today.getMonth() &&
                    $scope.todayNutritionPie.today.getFullYear() !== today.getFullYear() &&
                      $scope.todayNutritionPie.today !== null) {
        $scope.todayNutritionPie.today = new Date()
        $scope.todayNutritionPie.fat = 0
        $scope.todayNutritionPie.carbs = 0
        $scope.todayNutritionPie.protein = 0
      }
      console.log('nutritiondata', $scope.nutritionData)
      for (var i = 0; i < $scope.nutritionData.length; i++) {
        var logDate = new Date($scope.nutritionData[i].date)
        if (logDate.getMonth() === today.getMonth() &&
              logDate.getDate() === today.getDate() &&
                logDate.getFullYear() === today.getFullYear()) {
          $scope.todayNutritionPie.fat += Number($scope.nutritionData[i].fat)
          $scope.todayNutritionPie.carbs += Number($scope.nutritionData[i].carbs)
          $scope.todayNutritionPie.protein += Number($scope.nutritionData[i].protein)
          console.log('carbs: ', $scope.todayNutritionPie.carbs)
        }
      }
      console.log('today data:', $scope.todayNutritionPie)
      return $scope.todayNutritionPie
    }

    $scope.createChart = function () {
      $scope.waterData = {
        labels: $scope.getPastSevenDays(),
        series: [
          $scope.waterIntake
        ]
      }

      $scope.calorieData = {
        labels: $scope.getPastSevenDays(),

      }



      var pieData = $scope.todaysPieData()
      console.log(pieData)

      new Chartist.Bar('#ct1', $scope.waterData);
      new Chartist.Pie('#ct2', {
        labels: ['Fat (g): ' + pieData.fat, 'Carbohydrates (g): ' + pieData.carbs, 'Protein (g): ' + pieData.protein],
        series: [{
          value: pieData.fat,
          name: 'Fat (g)',
          // label: 'Fat',
          // className: 'my-custom-class-one',
          meta: 'Fat'
        }, {
          value: pieData.carbs,
          name: 'Carbohydrates (g)',
          // className: 'my-custom-class-two',
          meta: 'Meta Two'
        }, {
          value: pieData.protein,
          name: 'Protein (g)',
          // className: 'my-custom-class-three',
          meta: 'Meta Three'
        }]
      });

      new Chartist.Line('#ct3', {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        series: [
          [12, 9, 7, 8, 5],
          [2, 1, 3.5, 7, 3],
          [1, 3, 4, 5, 6]
        ]
      }, {
        fullWidth: true,
        chartPadding: {
          right: 40
        }
      });
    }

    $scope.nutritionLogs = function () {
      nutritionFactory.getNutritionLogs($scope.username)
        .then(function(data) {
          console.log('nutrition logs: ', data.data.data)
          $scope.nutritionData = data.data.data
          $scope.getWater($scope.nutritionData)
          $scope.createChart()
        })
    }

    $scope.nutritionLogs()
    // $scope.createChart()
    $scope.getPastSevenDays()
    $scope.getGoals()

  })

  .directive('myGoals', function () {
  return {
    templateUrl: 'app/dashboard/directives/my-goals.html',
    controller: 'DashboardCtrl'
  }
})
  .directive('nutritionGraphs', function () {
  return {
    templateUrl: 'app/dashboard/directives/nutrition-graphs.html',
    controller: 'DashboardCtrl'
  }
})

  .directive('myCalculations', function () {
    return {
      templateUrl: 'app/dashboard/directives/my-calculations.html',
      controller: 'DashboardCtrl'
    }
  })
