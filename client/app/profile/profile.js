angular.module('myApp.profile', ['factories'])

  .controller('ProfileCtrl', function ($scope, profileFactory) {
    $scope.submitProfile = function () {
      console.log('submitted')
      profileFactory.submitProfile($scope.age, $scope.gender, $scope.height, $scope.weight, $scope.goalWeight)
        .then(function (data) {
          console.log('profile data inside profile.js =', data)
        })
    }
  })
