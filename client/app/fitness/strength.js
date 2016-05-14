angular.module('myApp.strength', ['factories'])
  .controller('StrengthCtrl', function ($scope, AuthFactory, StrengthFactory, $cookies, ProfileFactory, $state, $uibModal) {
    $scope.animationsEnabled = true
    $scope.user = $cookies.get('username')
    $scope.strengthList

    // Strength submission modal
    $scope.inputStrength = function () {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/fitness/strengthModal.html',
        controller: 'StrengthModalCtrl'
      })
    }

    // Calculating 90% one rep maximum
    $scope.onerepmax = function (weight, reps) {
      return (weight * (1 + (reps / 30))).toFixed(1)
    }

    // Getting profile information and then calling fetchLog
    const getStrengthProfile = function () {
      StrengthFactory.getStrength($scope.user)
        .then(function (data) {
          $scope.strengthList = data.data
        })
    }

    getStrengthProfile()

    $(function () {
      $("[data-toggle='tooltip']").tooltip()
    })
  })
