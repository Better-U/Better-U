angular.module('myApp.dashboard', [])

  .controller('DashboardCtrl', function ($scope, $window, $rootScope, $state, GoalsFactory, $cookies, StrengthFactory, ProfileFactory, NutritionFactory, $uibModal, filepickerService, AuthFactory, cardioFactory) {
    $scope.animationsEnabled = true
    $scope.username = $cookies.get('username')
    $rootScope.hideit = false
    $rootScope.landing = false
    $scope.waterIntake = null
    $scope.calorieIntake = null
    $scope.lastSevenSessions = null
    $scope.lastSevenPace = null

    $rootScope.signout = function () {
      $scope.signout()
    }

    $scope.nutritionData = null
    $scope.files = []
    $scope.goalsData = null
    $scope.dash = null

    $scope.strengthList
    $scope.c1_data = {labels: [], series: [[]]}
    $scope.c2_data = {labels: [], series: []}

    $scope.signout = function () {
      $cookies.remove('token')
      $cookies.remove('username')
      $state.go('landing')
    }

    $scope.getDashboardProfile = function () {
      AuthFactory.getProfile($scope.username)
        .then(function (data) {
          // console.log('data', data.data)
          $scope.dash = data.data[0]
          $scope.image = $scope.dash.image
          // console.log('image: ', $scope.image)
        })
    }

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
      if (gender === 0) {
        var maleBMR = 66.5 + (6.23 * numWeight) + (12.7 * numHeight) - (6.8 * numAge)
        if (activity === 'sedentary') {
          total = (maleBMR * 1.2).toFixed()
        } else if (activity === 'light') {
          total = (maleBMR * 1.375).toFixed()
        } else if (activity === 'moderate') {
          total = (maleBMR * 1.55).toFixed()
        } else if (activity === 'active') {
          total = (maleBMR * 1.725).toFixed()
        }
      } else if (gender === 1) {
        var femaleBMR = 655.1 + (4.35 * numWeight) + (4.7 * numHeight) - (4.7 * numAge)
        if (activity === 'sedentary') {
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
      if (gender === 0) {
        BMR = (66.5 + (6.23 * uWeight) + (12.7 * uHeight) - (6.8 * uAge)).toFixed(2)
      } else if (gender === 1) {
        BMR = (655.1 + (4.35 * uWeight) + (4.7 * uHeight) - (4.7 * uAge)).toFixed(2)
      }
      return BMR
    }

    $scope.removeLog = function (id) {
      GoalsFactory.removeLog(id)
        .then(function (data) {
          // console.log('successful delete', data)
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
          // console.log('data goals: ', data)
          $scope.goalsData = data.data.data
          // console.log($scope.goalsData)
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
        var formattedDate = today.setDate(today.getDate() - 1)
        results.unshift($scope.shortDateConverter(formattedDate))
      }

      // console.log('results: ', results)
      return results
    }

    $scope.convertWater = function (weight) {
      return Math.floor((weight * (2/3)) / 8)
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

    // Fetching Activity log function
    const fetchLog = function () {
      StrengthFactory.getStrength($scope.username)
        .then(function (data) {
          $scope.strengthList = data.data
          // reset $scope array values
          $scope.c1_data = {labels: [], series: [[]]}
          $scope.c2_data = {labels: [], series: []}

          c1_duration_date(data.data)
          c2_activity_type(data.data)
        })
        .then(function (data) {
          renderGraphs()
        })
    }

    const day_of_week = function (num) {
      var day
      switch (num) {
        case 0:
          day = 'Sunday'
          break
        case 1:
          day = 'Monday'
          break
        case 2:
          day = 'Tuesday'
          break
        case 3:
          day = 'Wednesday'
          break
        case 4:
          day = 'Thursday'
          break
        case 5:
          day = 'Friday'
          break
        case 6:
          day = 'Saturday'
          break
      }
      return day
    }

    // Chart Graph 1 - X: Date Y: Duration at Gym
    const c1_duration_date = function (arr) {
      var c1_obj = {}
      var dateshort
      // var days = arr.length

      // Creating object of [day of week:duration]
      for (var i = 0; i < arr.length; i++) {
        dateshort = arr[i].date
        var x = new Date(dateshort).getDay()
        if (c1_obj[x] !== undefined) {
          c1_obj[x] = c1_obj[x] + arr[i].duration
        } else {
          c1_obj[x] = arr[i].duration
        }
      }

      // Setting the label and series to scope c1_data
      for (var k in c1_obj) {
        $scope.c1_data.labels.push(day_of_week(parseInt(k)))
        $scope.c1_data.series[0].push(c1_obj[k])
      }
      console.log("THis is c1_data", $scope.c1_data)
    }

    // Pie Chart 2 - Type of activities for entire data set
    const c2_activity_type = function (arr) {
      var c2_obj = {}
      var c2_arr = []

      // Creating array of all strength workout types
      for (var i = 0; i < arr.length; i++) {
        c2_arr.push(arr[i].type)
      }

      // Counting instances(removing dup keys) of each strength workout type
      for (var j = 0; j < c2_arr.length; j++) {
        if (c2_obj[c2_arr[j]]) {
          c2_obj[c2_arr[j]]++
        } else {
          c2_obj[c2_arr[j]] = 1
        }
      }

      // Putting the instances and type into $scope.c2_data for export
      for (var k in c2_obj) {
        $scope.c2_data.labels.push(k)
        $scope.c2_data.series.push(c2_obj[k])
      }
      console.log("THis is c2_data", $scope.c2_data)
    }

    // Rendering the graphs
    const renderGraphs = function () {
      var options = {
        width: 500,
        height: 250,
        labelInterpolationFnc: function (value) {
          return value
        }
      }

      var responsiveOptions = [
        ['screen and (min-width: 640px)', {
          chartPadding: 30,
          labelOffset: 100,
          labelDirection: 'explode',
          labelInterpolationFnc: function (value) {
            return value
          }
        }],
        ['screen and (min-width: 1024px)', {
          labelOffset: 80,
          chartPadding: 20
        }]
      ]

      new Chartist.Bar('#chart1', $scope.c1_data, options)
      new Chartist.Pie('#chart2', $scope.c2_data, responsiveOptions)
    }

    $scope.getCalories = function (data) {
      var pastDays = $scope.getPastSevenDays()
      var results = []
      var sum = 0
      for (var i = 0; i < pastDays.length; i++) {
        sum = 0
        for (var j = 0; j < data.length; j++) {
          if ($scope.shortDateConverter(data[j].date) === pastDays[i]) {
            sum += Number(data[j].cal)
          }
        }
        results.push(sum)
      }

      $scope.calorieIntake = results
      return $scope.calorieIntake
    }

    // Getting Cardio Data

    $scope.getPastSevenSessions = function () {
      var dates = []
      var lastSeven = []
      cardioFactory.getCardio($scope.username)
      .then(function (data) {
        console.log("data inside getpastsevensessions", data)
        data.data.forEach(function (item) {
          dates.push(item.date)
        })
        dates.sort()
        if (dates.length > 7) {
          for (var i = dates.length - 7; i < dates.length; i++) {
            lastSeven.push($scope.shortDateConverter(dates[i]))
          }
        } else {
          for (var i = 0; i < dates.length; i++) {
            lastSeven.push($scope.shortDateConverter(dates[i]))
          }
        }
      })
      console.log(lastSeven, "lastSeven")
      return $scope.lastSevenSessions
    }

    $scope.getPaceData = function () {
      var pace = []
      var lastSevenPace = []
      cardioFactory.getCardio($scope.username)
        .then(function (data) {
          //console.log('getPaceDta', data)
          data.data.forEach(function (item) {
            //console.log('item: ', item)
            pace.push([$scope.shortDateConverter(item.date), item.time, item.pace])
            //console.log('this is pace: ', pace)
          })
          pace.sort(function (a, b) {
            if (Date.parse(b[0]) === Date.parse(a[0])) {
              if (a[1].slice(6) === b[1].slice(6)) {
                if (a[1].slice(0, 5) < b[1].slice(0, 5)) {
                  return -1
                } else if (a[1].slice(0, 5) > b[1].slice(0, 5)) {
                  return 1
                } else {
                  return 0
                }
              }
            }
            return Date.parse(b[0]) - Date.parse(a[0])
          })
          .reverse()

          if (pace.length > 7) {
            for (var i = pace.length - 7; i < pace.length; i++) {
              //console.log('this is pace[i]', pace[i])
              lastSevenPace.push(pace[i][2])
            }
          } else {
            for (var i = 0; i < pace.length; i++) {
              //console.log('this is pace[i]', pace[i])
              lastSevenPace.push(pace[i][2])
            }
          }
          //console.log('lastSevenPace', lastSevenPace)
          $scope.lastSevenPace = lastSevenPace
          //console.log('this is $scope.lastDventPace: ', $scope.lastSevenPace)
        })
      return $scope.lastSevenPace
    }

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
        // $scope.todayNutritionPie.fat = 0
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
          // $scope.todayNutritionPie.protein += Number($scope.nutritionData[i].protein)
          // console.log('carbs: ', $scope.todayNutritionPie.carbs)
        }
      }

      return $scope.todayNutritionPie
    }

    $scope.getPastSevenSessions = function () {
      var dates = []
      var lastSeven = []
      return new Promise(function(resolve) {
        cardioFactory.getCardio($scope.username)
          .then(function (data) {
            data.data.forEach(function (item) {
              dates.push([ item.date, item.time ])
            })
            dates.sort(function (a, b) {
                if (Date.parse(b[ 0 ]) === Date.parse(a[ 0 ])) {
                  if (a[ 1 ].slice(6) === b[ 1 ].slice(6)) {
                    if (a[ 1 ].slice(0, 5) < b[ 1 ].slice(0, 5)) {
                      return -1
                    } else if (a[ 1 ].slice(0, 5) > b[ 1 ].slice(0, 5)) {
                      return 1
                    } else {
                      return 0
                    }
                  }
                }
                return Date.parse(b[ 0 ]) - Date.parse(a[ 0 ])
              })
              .reverse()

            if (dates.length > 7) {
              for (var i = dates.length - 7; i < dates.length; i++) {
                lastSeven.push($scope.shortDateConverter(dates[ i ][ 0 ]).concat(dates[ i ][ 1 ]))
              }
            } else {
              for (var i = 0; i < dates.length; i++) {
                lastSeven.push($scope.shortDateConverter(dates[ i ][ 0 ]).concat(dates[ i ][ 1 ]))
              }
            }
            //console.log('lastSeven =', lastSeven)
            $scope.lastSevenSessions = lastSeven
            resolve($scope.lastSevenSessions)
          })
        //console.log('this is lastsevensessions: ', $scope.lastSevenSessions)
      })
    }

    $scope.createChart = function () {
      $scope.cardioData = {
        labels: [],
        series: []
      }
      $scope.getPastSevenSessions()
        .then(function (data) {
          $scope.cardioData = {
            labels: data,
            series: [
              $scope.lastSevenPace
            ]
          }
          new Chartist.Line('#ct4', $scope.cardioData, {low: 0, showArea: true})

          //console.log($scope.cardioData, "CARDIODATA IN PASTSEVENSESSIONs")
        })

      $scope.waterData = {
        labels: $scope.getPastSevenDays(),
        series: [
          $scope.waterIntake
        ]
      }

      $scope.calorieData = {
        labels: $scope.getPastSevenDays(),
        series: [
          $scope.calorieIntake
        ]

      }
      $scope.cardioData={
        labels: null,
        series: []
      }
      // Chart for Cardio
      //   'getPaceData', $scope.lastSevenPace)

      $scope.lastSevenPace = $scope.getPaceData()

      var pieData = $scope.todaysPieData()
      // console.log(pieData)

      new Chartist.Bar('#ct1', $scope.waterData)
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
      })
      new Chartist.Line('#ct3', $scope.calorieData)

      var chart = new Chartist.Pie('#ct1', {
        series: [$scope.waterIntake[6]],
        labels: [($scope.waterIntake[6]) + ' of ' + $scope.convertWater($scope.dash.weight) + ' cups']
      }, {
        donut: true,
        showLabel: true,
        total: $scope.convertWater($scope.dash.weight),
        chartPadding: 30,
        labelOffset: 50,
        labelDirection: 'explode'
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
              to:  '0px',
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

    $scope.nutritionLogs = function () {
      NutritionFactory.getFoodLog($scope.username)
        .then(function (data) {
          $scope.nutritionData = data.data
          $scope.getWater($scope.nutritionData)
          $scope.getCalories($scope.nutritionData)
          $scope.getPaceData()
          $scope.getPastSevenSessions()
          $scope.createChart()
        })
    }

    $scope.init = function () {
      $scope.nutritionLogs()
      $scope.getGoals()
      $scope.getDashboardProfile()
      $scope.getPastSevenSessions()

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    })

      fetchLog()
    }

    $scope.init()

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

  .directive('tooltip', function(){
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        $(element).hover(function(){
          $(element).tooltip('show');
        }, function(){
          $(element).tooltip('hide');
        });
      }
    };
  });


