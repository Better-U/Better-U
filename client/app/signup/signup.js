angular.module('myApp.signup', ['factories'])

  .controller('SignupCtrl', function ($scope, authFactory, $state, $uibModalInstance) {
    $scope.alreadyExists;
    $scope.next = false
    $scope.profileButton = false

    $scope.user = {
      name: null,
      password: null,
      age: null,
      height: null,
      weight: null,
      gender: null,
      interest: null,
      gym: null
    }

    $scope.submit = function () {
      console.log('inside submit')
      $uibModalInstance.dismiss('cancel')
      authFactory.registerProfileDetails($scope.user.name, $scope.user.age, $scope.user.height, $scope.user.weight, $scope.user.gender, $scope.user.interest, $scope.user.gym)
        .then(function (data) {
          console.log('after profile added to db', data)
          authFactory.userData = data.data
          $scope.token = data.data.token
          console.log($scope.token)
          window.localStorage.setItem('token', authFactory.userData.token)
          $state.go('dashboard')
        })

    }

    $scope.goSignin = function () {
      $state.go('signin')
    }

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
      // $state.go('registerProfile')
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    }

    $scope.goNext = function () {
      if ($scope.user.name && $scope.user.password) {
        authFactory.registerUserDetails($scope.user.name, $scope.user.password)
          .then(function (data) {
            $scope.alreadyExists = data.data.exists
            if ($scope.alreadyExists) {
              console.log('inside here')
              $state.reload('signin')
            } else {
              $scope.next = true
              $scope.profileButton = true
            }
          })
      }
    }
  })
