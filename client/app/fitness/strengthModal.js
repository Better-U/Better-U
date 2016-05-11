angular.module('myApp.strengthModal', ['factories'])
  .controller('StrengthModalCtrl', function ($scope, AuthFactory, StrengthFactory, $cookies, ProfileFactory, $state, $uibModal, $uibModalInstance) {
    // Date Stuff
    $scope.today = function () {
      $scope.dt = new Date()
    }

    $scope.user = $cookies.get('username')
    $scope.animationsEnabled = true
    $scope.noInput = false

    // Submit Button
    $scope.submitStrength = function () {
      if ($scope.str.date === undefined || $scope.str.type === undefined || $scope.str.weight === undefined || $scope.str.sets === undefined || $scope.str.reps === undefined) {
        $scope.noInput = true
      } else {
        $uibModalInstance.dismiss('cancel')
        StrengthFactory.submitStrength(
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
            $state.reload()
          })
      }
    }

    // Converting inches to feet and inches
    $scope.convert_feet = function (inches) {
      var feet = Math.floor(inches / 12)
      var inch = inches - feet * 12
      var tall = feet + "'" + inch
      return tall
    }
  })
