angular.module('myApp.signup', [])

  .controller('SignupCtrl', function ($scope, AuthFactory, $state, $uibModalInstance, $uibModal, $cookies, $rootScope) {
    $scope.alreadyExists = null
    $scope.userExistError = false
    $scope.animationsEnabled = true
    $scope.next = false
    $scope.profileButton = false
    $scope.noUserDetail = false

    $scope.user = {
      name: null,
      password: null,
      age: null,
      height: null,
      weight: null,
      gender: null,
      activity: null,
      interest: null,
      gym: null,
      otherGym: null
    }


    $scope.submit = function () {

      if (!$scope.user.gym) {
        $scope.user.gym = $scope.user.otherGym
      }

      var username = $cookies.get('username')
      $uibModalInstance.dismiss('cancel')
        AuthFactory.registerProfileDetails(username, $scope.user.age, $scope.user.height, $scope.user.weight, $scope.user.gender, $scope.user.activity, $scope.user.interest, $scope.user.gym)
          .then(function (data) {
            $cookies.put('token', data.data.token)
            AuthFactory.getProfile($cookies.get('username'))
              .then(function (data) {
                AuthFactory.userData = data.data
                console.log('data', data.data[0])
                console.log('run dashboard data: ', AuthFactory.userData)
                $state.go('dashboard')
              })
          })
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }

    $scope.goNext = function () {
      // if ($scope.user.name && $scope.user.password) {
      console.log('inside go next')
        AuthFactory.registerUserDetails($scope.user.name, $scope.user.password)
          .then(function (data) {
            console.log('data after next: ', data)
            $scope.alreadyExists = data.data.exists
            if ($scope.alreadyExists) {
              $scope.noUserDetail = false
              $scope.userExistError = true
            } else {
              $scope.next = true
              $scope.profileButton = true
              $cookies.put('username', data.config.data.username)
              $scope.registerProfile()
            }
          })
      // } else {
      //   $scope.noUserDetail = true
      // }
    }

    $scope.signin = function () {
      $uibModalInstance.dismiss('cancel')
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/signin/signin.html',
        controller: 'SigninCtrl'
      })
    }

    $scope.registerProfile = function () {
      $uibModalInstance.dismiss('cancel')
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/signup/registerProfile.html',
        controller: 'SignupCtrl',
        // windowClass: 'register-profile-modal',
        windowClass: 'app-modal-window-signup'
      })
    }
  })
.directive('theGym', function(){
  return {
    restrict: 'A',
    transclude: true,
    scope: true,
    link: function(scope, element, attrs){
        element.bind('click',function(

          ){
          console.log(scope.user.gym, "click is working")
          scope.user.gym = ''
          console.log(scope.user.gym)
        })

      }
    }
})