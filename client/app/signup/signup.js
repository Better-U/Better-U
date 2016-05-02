angular.module('myApp.signup', ['factories'])

  .controller('SignupCtrl', function ($scope, authFactory, $state, $uibModalInstance, $uibModal) {
    $scope.alreadyExists = null
    $scope.userExistError = false
    $scope.animationsEnabled = true
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
          authFactory.userData = data.config.data
          authFactory.userToken = data.data.token
          $scope.token = data.data.token
          console.log($scope.token)
          window.localStorage.setItem('token', authFactory.userToken)
          console.log('')
          $state.go('dashboard')
        })

    }


    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item)
      // $state.go('registerProfile')
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }

    $scope.goNext = function () {
      if ($scope.user.name && $scope.user.password) {
        authFactory.registerUserDetails($scope.user.name, $scope.user.password)
          .then(function (data) {
            $scope.alreadyExists = data.data.exists
            if ($scope.alreadyExists) {
              console.log('inside here')
              $scope.userExistError = true
            } else {
              $scope.next = true
              $scope.profileButton = true
            }
          })
      }
    }

    
    $scope.signin = function () {
      $uibModalInstance.dismiss('cancel')
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/signin/signin.html',
        controller: 'SigninCtrl',
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      })

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem
      }, function () {
        console.log('hi')
      })
    }

  })
