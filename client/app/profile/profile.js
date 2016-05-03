angular.module('myApp.profile', ['factories'])

  .controller('ProfileCtrl', function ($scope, $window, authFactory, profileFactory) {
    $scope.init = function () {
      console.log('inside getProfile')
      console.log('localstorage user id', $window.localStorage.userId)
      profileFactory.getProfile($window.localStorage.userId)
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
      console.log('localStorage.userId =', $window.localStorage.userId)
      profileFactory.submitProfile($window.localStorage.userId, $scope.prof.weight, $scope.prof.bodyFat, $('input[name="prof.activity"]:checked').val(), $scope.prof.interest, $scope.prof.gym)
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
