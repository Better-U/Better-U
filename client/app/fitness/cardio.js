angular.module('myApp.cardio', ['factories'])
  .controller('CardioCtrl', function ($scope, cardioFactory, authFactory, $cookies, $state, $uibModal) {
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

    $scope.cardioList = function () {
      cardioFactory.getCardio(user).then(function (data) {
        $scope.cardioData = data.data
    }

    $scope.cardioList()
  })
