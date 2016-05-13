angular.module('myApp.cardioModal', ['factories'])
  .controller('CardioModalCtrl', function ($scope, cardioFactory, AuthFactory, $cookies, $state, $uibModal, $uibModalInstance) {
    $scope.animationsEnabled = true
    $scope.noInput = false
    var user = $cookies.get('username')

    $scope.today = function () {
      $scope.date = new Date()
    }

    $scope.today()

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

    $scope.pace = function (duration, distance) {
      if (duration === undefined || distance === undefined) {
        return 0
      } else {
        var convertSeconds = duration * 60
        var pace = ((convertSeconds / distance) / 60).toFixed(2)
        return pace
      }
    }

    $scope.convertMiles = function (meters) {
      if (meters > 0) {
        var convert = meters * 0.000621371
        return convert.toFixed(2)
      } else {
        return 0
      }
    }

    $scope.convertTime = function formatDate (date) {
      var d = new Date(date)
      var hh = d.getHours()
      var m = d.getMinutes()
      var s = d.getSeconds()
      var dd = 'AM'
      var h = hh
      if (h >= 12) {
        h = hh - 12
        dd = 'PM'
      }
      if (h == 0) {
        h = 12
      }
      m = m < 10 ? '0' + m : m

      s = s < 10 ? '0' + s : s

      /* if you want 2 digit hours: */
      h = h < 10 ? '0' + h : h

      return (h + ':' + m + ' ' + dd)
    }

    $scope.submitCardio = function () {
      if ($scope.date === undefined || $scope.distance === undefined || $scope.duration === undefined || $scope.type === undefined) {
        $scope.noInput = true
      } else {
        var pace = $scope.pace($scope.duration, $scope.distance)
        $uibModalInstance.dismiss('cancel')
        console.log('$scope.time', $scope.time.toString())
        console.log('new Date($scope.time).getTime()', new Date($scope.time).getTime())

        var newTime = new Date($scope.time).getTime()
        var convertedTime = $scope.convertTime(newTime)
        cardioFactory.submitCardio(user, $scope.date, convertedTime, $scope.type[0], $scope.distance, $scope.duration, pace, $scope.intensity)

          .then(function (data) {
            console.log('data from time', data)
            $state.reload()
          })
      }
    }
  })
