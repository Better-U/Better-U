angular.module('myApp.strengthGraphs', [])

  .controller('strengthGraphsCtrl', function ($scope, StrengthFactory, AuthFactory, $cookies) {
    $scope.userData = null
    $scope.strengthData = []
    $scope.c1_data = []
    $scope.c2_data = []

    $scope.getUserData = function () {
      AuthFactory.getProfile($cookies.get('username'))
        .then(function (data) {
          $scope.userData = data.data[0]
          $scope.getStrengthLogs()
        })
    }

    $scope.getStrengthLogs = function () {
      StrengthFactory.getStrength($scope.userData.username)
        .then(function (data) {
          $scope.strengthData = data.data
          // reset $scope array values
          $scope.c1_data = {labels: [], series: [[]]}
          $scope.c2_data = {labels: [], series: []}

          $scope.c1_duration_date(data.data)
          $scope.c2_activity_type(data.data)
          $scope.createStrengthCharts()
        })
    }

    $scope.getDayOfWeek = function (num) {
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

    $scope.c1_duration_date = function (arr) {
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

      $scope.c2_activity_type = function (arr) {
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

      // Setting the label and series to scope c1_data
      for (var k in c1_obj) {
        $scope.c1_data.labels.push($scope.getDayOfWeek(parseInt(k)))
        $scope.c1_data.series[0].push(c1_obj[k])
      }
      console.log("THis is c1_data", $scope.c1_data)
    }

    $scope.createStrengthCharts = function () {
      var options = {
        width: 600,
        height: 300,
        labelInterpolationFnc: function (value) {
          return value
        }
      }

      var options2 = {
        width: 290,
        height: 240,
        labelInterpolationFnc: function (value) {
          return value
        }
      }

      console.log('$scope c1 data before render: ', $scope.c1_data.labels)
      new Chartist.Bar('#str-chart-1', {
        labels: $scope.c1_data.labels,
        series: $scope.c1_data.series
      }, options)
      new Chartist.Pie('#str-chart-2', $scope.c2_data, options2)
    }

    $scope.init = function () {
      $scope.getUserData()
    }

    $scope.init()
  })

