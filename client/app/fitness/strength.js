angular.module('myApp.strength', ['factories'])
  .controller('StrengthCtrl', function ($scope, AuthFactory, StrengthFactory, $cookies, ProfileFactory, $state, $uibModal) {
    $scope.animationsEnabled = true

    $scope.inputStrength = function () {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/fitness/strengthModal.html',
        controller: 'StrengthModalCtrl'
      })
    }

    $scope.user = $cookies.get('username')
    $scope.strengthList

    // Getting profile information and then calling fetchLog
    $scope.getStrengthProfile = function () {
      StrengthFactory.getStrength($scope.user)
        .then(function (data) {
          $scope.strengthList = data.data
        })
    }

    // Calculating 90% one rep maximum
    $scope.onerepmax = function (weight, reps) {
      return (weight * (1 + (reps / 30))).toFixed(1)
    }

    $scope.getStrengthProfile()

    $(function () {
      $("[data-toggle='tooltip']").tooltip()
    })
  })
