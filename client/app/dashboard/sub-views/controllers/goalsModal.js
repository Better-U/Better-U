angular.module('myApp.goals', [])

  .controller('goalsModalCtrl', function ($scope, $cookies, GoalsFactory, $cookies, $state, $uibModalInstance) {
    $scope.animationsEnabled = true
    $scope.added = false
    $scope.disabled = false

    $scope.submitCardio = function (date, intensity, category, value, measurement, points) {
      $uibModalInstance.dismiss('cancel')
      GoalsFactory.postLog('cardio', date, intensity, category, value, measurement, $cookies.get('username'), points)
        .then(function (data) {
          $state.reload()
        })
    }

    $scope.submitStrength = function (date, intensity, category, value, measurement, points) {
      $uibModalInstance.dismiss('cancel')
      GoalsFactory.postLog('strength', date, intensity, category, value, measurement, $cookies.get('username'), points)
        .then(function (data) {
          $state.reload()
        })
    }

  })
