angular.module('myApp.strength', ['factories'])
  .controller('StrengthCtrl', function ($scope, authFactory, strengthFactory, $cookies, profileFactory) {
    $scope.user = $cookies.get('username')
    $scope.strengthList
    $scope.c1_data = {labels: [], series: []}
    $scope.c2_data = {labels: [], series: []}

    $scope.getStrengthProfile = function () {
      profileFactory.getProfile($scope.user)
        .then(function (data) {
          $scope.display = data.data[0]
        })
        .then(function () {
          fetchLog()
        })
    }

    $scope.getStrengthProfile()

    const fetchLog = function () {
      strengthFactory.getStrength($scope.user)
        .then(function (data) {
          $scope.strengthList = data.data
          c1_duration_date(data.data)
          c2_activity_type(data.data)
        })
        .then(function (data) {
          renderGraphs()
        })
    }

    const c1_duration_date = function (arr) {
      var c1_obj = {}
      var dateshort
      console.log(arr)
      // Creating object of [day of week:duration]
      for (var i = 0; i < arr.length; i++) {
        dateshort = arr[i].date.substring(0, 10)
        c1_obj[dateshort] = arr[i].duration
      }
      console.log(c1_obj)
      // Setting the label and series to scope c1_data
      for (var k in c1_obj) {
        $scope.c1_data.labels.push(k)
        $scope.c1_data.series.push(c1_obj[k])
      }
      console.log($scope.c1_data)
    }

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
        }
        else {
          c2_obj[c2_arr[j]] = 1
        }
      }

      // Putting the instances and type into $scope.c2_data for export
      for (var k in c2_obj) {
        $scope.c2_data.labels.push(k)
        $scope.c2_data.series.push(c2_obj[k])
      }
    }

    // Render the graphs
    const renderGraphs = function () {
      var options = {
        width: 1000,
        height: 400,
        labelInterpolationFnc: function (value) {
          return value[0]
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
      console.log($scope.c1_data)
      console.log($scope.c2_data)
      new Chartist.Line('#chart1', $scope.c1_data, options)
      new Chartist.Pie('#chart2', $scope.c2_data, options, responsiveOptions)
    }

    $scope.submitStrength = function () {
      strengthFactory.submitStrength(
        $scope.user,
        $scope.str.date,
        $scope.str.type,
        $scope.str.sets,
        $scope.str.intensity,
        $scope.str.duration,
        $scope.str.weight,
        $scope.str.reps
      )
        .then(function (data) {
          $scope.str = {}
          fetchLog()
        })
    }

    $scope.convert_feet = function (inches) {
      var feet = Math.floor(inches / 12)
      var inch = inches - feet * 12
      var tall = feet + "'" + inch
      return tall
    }

    $scope.onerepmax = function (weight, reps) {
      return (weight * (1 + (reps / 30))).toFixed(1)
    }
  })
