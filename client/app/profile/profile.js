angular.module('myApp.profile', ['factories'])

  .controller('ProfileCtrl', function ($scope, $window, authFactory, profileFactory, $cookies) {
    $scope.init = function () {
      console.log('inside getProfile')
      profileFactory.getProfile($cookies.get('username'))
        .then(function (data) {
          console.log('data inside profileFactory.getProfile =', data.data[0])
          $scope.display = data.data[0]
          $scope.prof = {activity: data.data[0].activitylvl,
            gym: data.data[0].gym
          }
          console.log('scope interest', $scope.display.interest)
          $scope.prof.interest = $scope.display.interest
        })
    }
    $scope.submitProfile = function () {
      console.log('submitted')
      profileFactory.submitProfile($cookies.get('username'), $scope.prof.weight, $scope.prof.bodyFat, $('input[name="prof.activity"]:checked').val(), $scope.prof.interest, $scope.prof.gym)
        .then(function (data) {
          console.log('profile data inside profile.js =', data)
        })
    }

    $scope.getGender = function (integer) {
      var gender = Number(integer)
      if (gender === 0) {
        return 'Male'
      } else {
        return 'Female'
      }
    }
  })
