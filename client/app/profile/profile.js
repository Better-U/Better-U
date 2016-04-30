angular.module('myApp.profile', ['factories'])

  .controller('ProfileCtrl', function ($scope, profileFactory) {
    $scope.submitProfile = function () {
      console.log('submitted')
      console.log('$scope.bodyFat', $scope.prof.bodyFat)
      profileFactory.submitProfile($scope.prof.bodyFat, $('input[name="prof.activity"]:checked').val(), $scope.prof.interest)
        .then(function (data) {
          console.log('profile data inside profile.js =', data)
        })
    }
  })
