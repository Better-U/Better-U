angular.module('myApp.cardioModal', ['factories'])
  .controller('CardioModalCtrl', function ($scope, cardioFactory, AuthFactory, $cookies, $state, $uibModal, $uibModalInstance) {
    $scope.animationsEnabled = true
    $scope.noInput = false
    var user = $cookies.get('username')

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

    $scope.submitCardio = function () {
      if ($scope.date === undefined || $scope.distance === undefined || $scope.duration === undefined || $scope.type === undefined) {
        $scope.noInput = true
      } else {
        var pace = $scope.pace($scope.duration, $scope.distance)
        $uibModalInstance.dismiss('cancel')
        console.log('$scope.time', $scope.time)
        console.log('new Date($scope.time).getTime()', new Date($scope.time).getTime())
        // var newTime = new Date($scope.time).getTime()
        // var newTime = Date.parse($scope.time)
        cardioFactory.submitCardio(user, $scope.date, $scope.time, $scope.type, $scope.distance, $scope.duration, pace, $scope.intensity)
          .then(function (data) {
            console.log('data from time', data)
            $state.reload()
          })
      }
    }
  })
