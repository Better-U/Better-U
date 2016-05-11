angular.module('myApp.profile', ['factories'])

  .controller('ProfileCtrl', function ($state, $scope, $window, authFactory, profileFactory, $cookies, filepickerService) {
    $scope.changesSaved = false
    $scope.username = $cookies.get('username')
    $scope.init = function () {
      profileFactory.getProfile($cookies.get('username'))
        .then(function (data) {
          console.log('data inside profileFactory.getProfile =', data.data[0])
          $scope.display = data.data[0]
          $scope.prof = {activity: data.data[0].activitylvl,
            gym: data.data[0].gym
          }
          $scope.image = data.data[0].image
          $scope.prof.interest = $scope.display.interest
        })
    }
    $scope.submitProfile = function () {
      console.log('submitted')
      profileFactory.submitProfile($cookies.get('username'), $scope.prof.weight, $scope.prof.bodyFat, $('input[name="prof.activity"]:checked').val(), $scope.prof.interest, $scope.prof.gym)
        .then(function (data) {
          $scope.changesSaved = true
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

    $scope.upload = function () {
      filepickerService.pick(
        {
          mimetype: 'image/*',
          language: 'en',
          services: ['COMPUTER', 'DROPBOX', 'GOOGLE_DRIVE', 'IMAGE_SEARCH', 'FACEBOOK', 'INSTAGRAM'],
          openTo: 'IMAGE_SEARCH'
        },
        function (Blob) {
          console.log(JSON.stringify(Blob))
          // $scope.superhero.picture = Blob
          profileFactory.uploadPicture($scope.username, JSON.stringify(Blob))
            .then(function (data) {
              console.log('upload data: ', data)
              // $scope.apply()
              $scope.image = data
              $state.reload()
            })
        // $state.reload()
        }
      )
    }
  })
