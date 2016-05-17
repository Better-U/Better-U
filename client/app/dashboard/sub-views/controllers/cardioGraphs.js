angular.module('myApp.cardioGraphs', [])

  .controller('cardioGraphsCtrl', function ($scope, cardioFactory, AuthFactory, $cookies) {
    $scope.userData = null
    $scope.nutritionData = null
    $scope.lastSevenSessions = []
    $scope.lastSevenPace = []
    $scope.dates = []
    $scope.pace = []

    $scope.shortDateConverter = function (dateStr) {
      var date = new Date(dateStr)
      return (date.getMonth() + 1) + '/' + (date.getDate()) + '/' + (date.getFullYear())
    }

    $scope.getUserData = function () {
      AuthFactory.getProfile($cookies.get('username'))
        .then(function (data) {
          $scope.userData = data.data[0]
          cardioFactory.getCardio($scope.userData.username)
            .then(function (data) {
              data.data.forEach(function (item) {
                $scope.dates.push([item.date, item.time])
              })
              $scope.dates.sort()
              if ($scope.dates.length > 7) {
                for (var i = $scope.dates.length - 7; i < $scope.dates.length; i++) {
                  $scope.lastSevenSessions.push($scope.shortDateConverter($scope.dates[i][0]) + '\n' + $scope.dates[i][1])
                }
              } else {
                for (var i = 0; i < $scope.dates.length; i++) {
                  $scope.lastSevenSessions.push($scope.shortDateConverter($scope.dates[i][0]) + '\n' + $scope.dates[i][1])
                }
              }
              cardioFactory.getCardio($scope.userData.username)
                .then(function (data) {
                  data.data.forEach(function (item) {
                    $scope.pace.push([$scope.shortDateConverter(item.date), item.time, item.pace])
                  })
                  $scope.pace.sort(function (a, b) {
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
                  if ($scope.pace.length > 7) {
                    for (var i = $scope.pace.length - 7; i < $scope.pace.length; i++) {
                      $scope.lastSevenPace.push($scope.pace[i][2])
                    }
                  } else {
                    for (var i = 0; i < $scope.pace.length; i++) {
                      $scope.lastSevenPace.push($scope.pace[i][2])
                    }
                  }
                  $scope.createCardioCharts()
                })
            })
        })
    }
    $scope.createCardioCharts = function () {
      $scope.cardioData = {
        labels: $scope.lastSevenSessions,
        series: [$scope.lastSevenPace]
      }
      new Chartist.Line('#cardio-pace', $scope.cardioData, {
        low: 0,
        width: 650,
        showArea: true
      })
    }

    $scope.init = function () {
      $scope.getUserData()
    }
    $scope.init()
  })
