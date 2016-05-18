angular.module('myApp.cardio', ['factories'])
  .controller('CardioCtrl', function ($scope, cardioFactory, AuthFactory, $cookies, $state, $uibModal) {
    var user = $cookies.get('username')
    $scope.animationsEnabled = true

    $scope.inputCardio = function () {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/fitness/cardioModal.html',
        controller: 'CardioModalCtrl'
      })
    }

    $scope.cardioData = null

    $scope.shortenDate = function (date) {
      var dateArr = date.split('')
      return dateArr.splice(0, 10).join('')
    }

    // Fetches cardio logs and displays in table
    $scope.cardioList = function () {
      cardioFactory.getCardio(user).then(function (data) {
        $scope.cardioData = data.data
      })
    }

    $scope.init = function () {
      $scope.cardioList()
    }

    $scope.init()
  })
