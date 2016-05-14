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
              console.log("data inside getpastsevensessions", data)
              data.data.forEach(function (item) {
                $scope.dates.push(item.date)
                console.log('dates array: ', $scope.dates)
              })
              $scope.dates.sort()
              if ($scope.dates.length > 7) {
                for (var i = $scope.dates.length - 7; i < $scope.dates.length; i++) {
                  $scope.lastSeven.push($scope.shortDateConverter(dates[i]))
                }
              } else {
                for (var i = 0; i < $scope.dates.length; i++) {
                  $scope.lastSevenSessions.push($scope.shortDateConverter($scope.dates[i]))
                }
              }
              cardioFactory.getCardio($scope.userData.username)
                .then(function (data) {
                  console.log('this is data after get vcardio: ', data)
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

                  console.log('this is scope.pace: ', $scope.pace)
                  if ($scope.pace.length > 7) {

                    for (var i = $scope.pace.length - 7; i < $scope.pace.length; i++) {
                      $scope.lastSevenPace.push($scope.pace[i][2])
                    }
                  } else {
                    for (var i = 0; i < $scope.pace.length; i++) {
                      $scope.lastSevenPace.push($scope.pace[i][2])
                    }
                  }
              console.log('scope last seven pace inside init: ', $scope.lastSevenPace)
              $scope.createCardioCharts()
                })
            })
        })
    }

    $scope.createCardioCharts = function () {
      console.log('last seven sessions: ', $scope.lastSevenSessions)
      console.log('last even pace: ', $scope.lastSevenPace)
      $scope.cardioData = {
        labels: $scope.lastSevenSessions,
        series: [$scope.lastSevenPace]
      }

      new Chartist.Line('#cardio-pace', $scope.cardioData, {
        low: 0,
        showArea: true
      })
    }

    $scope.init = function () {
      $scope.getUserData()
    }

    $scope.init()
  })

