angular.module('myApp.cardio', ['factories'])

  .controller('CardioCtrl', function ($scope, cardioFactory) {
    $scope.exercise = "hello"
    $scope.submitCardio = function () {
      console.log('this is cardioContrl')
      console.log('cardio type ', $scope.type)
      cardioFactory.submitCardio($scope.date, $scope.category, $scope.type, $scope.distance, $scope.duration)
        .then(function (data) {
          console.log('cardio data logged: ', data)
        })
    }
  })
