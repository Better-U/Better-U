angular.module('myApp.bet', ['factories'])
  .controller('betCtrl', function ($scope, AuthFactory, $cookies, GoalsFactory, BetsFactory, ProfileFactory, $state) {
    $scope.username = $cookies.get('username')

    $scope.userPoints = null
    $scope.withGoalsList = null
    $scope.userBets = null
    $scope.betsPlacedList = null
    $scope.displayUser = null
    $scope.totalpts = null

    $scope.topPointsList = function () {
      BetsFactory.getAllPoints($scope.username)
        .then(function (data) {
          $scope.userPoints = data.data.data[0]
        })
    }

    $scope.addBets = function (u_id, g_id) {
      BetsFactory.addBets(u_id, g_id, $scope.username)
        .then(function () {
          swal('Bet Made', 'Click OK to make another bet', 'success')
          $scope.placedBets()
          $state.reload()
        })
    }

    $scope.submitSearch = function () {
      GoalsFactory.getLog($scope.searchbetuser)
        .then(function (data) {
          $scope.withGoalsList = data.data.data
          $scope.displayUser = $scope.searchbetuser
          for (var i = 0; i < data.data.data.length; i++) {
            $scope.searchBets(data.data.data[i])
          }
        })
    }

    $scope.fetchBets = function () {
      BetsFactory.fetchBets($scope.username)
        .then(function (data) {
          $scope.userBets = data.data.data[0]
        })
    }

    $scope.placedBets = function () {
      BetsFactory.placedBets($scope.username)
        .then(function (data) {
          $scope.betsPlacedList = data.data.data[0]
        })
    }

    $scope.searchBets = function (goal) {
      BetsFactory.searchBets(goal.id, $scope.username)
        .then(function (data) {
          if (data.data.data[0].length > 0) {
            goal.status = true
          } else {
            goal.status = false
          }
        })
    }

    $scope.getPoints = function () {
      ProfileFactory.getProfile($scope.username)
        .then(function (data) {
          $scope.totalpts = data.data[0].totalpts
        })
    }

    $scope.bettorSeries = []

    $scope.bettorPoints = function () {
      BetsFactory.bettorBets($scope.username)
        .then(function (data) {
          console.log('inside bettorPoints: ', data.data.data[0])
          var blob = data.data.data[0]
          for (var i = 0; i < blob.length; i++) {
            console.log('inside blob loop', blob[i].bettor_pts, blob[i].user_pts)
            $scope.bettorSeries.push(blob[i].bettor_pts)
          }
        })
        .then(function () {
          var chart = new Chartist.Line('.ct-chart', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
              $scope.bettorSeries
            ]
          }, {
            low: 0,
            showArea: true,
            showPoint: true,
            fullWidth: true
          })

          chart.on('draw', function (data) {
            if (data.type === 'line' || data.type === 'area') {
              data.element.animate({
                d: {
                  begin: 2000 * data.index,
                  dur: 2000,
                  from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                  to: data.path.clone().stringify(),
                  easing: Chartist.Svg.Easing.easeOutQuint
                }
              })
            }
          })
        })
    }

    $scope.bettorPoints()
    $scope.getPoints()
    $scope.topPointsList()
    $scope.placedBets()
    $scope.fetchBets()
  })
