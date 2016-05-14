angular.module('myApp.goals', [])

  .controller('goalsModalCtrl', function ($scope, GoalsFactory, $cookies, $state, $uibModalInstance) {
    $scope.animationsEnabled = true
    $scope.added = false
    $scope.disabled = false



    $scope.submitCardio = function (date, intensity, category, value, measurement, points) {
      console.log('calling submit cardio')
      var username = $cookies.get('username')
      if (!date || !intensity || !category || !value || !measurement || !points) {
        console.log('this is form data: ', date, intensity, category, measurement, points)
        console.log('Form not valid')
      } else {
        $uibModalInstance.dismiss('cancel')
        GoalsFactory.postLog('cardio', date, intensity, category, value, measurement, username, points)
          .then(function (data) {
            console.log('cardio goal submitted', data)
            $state.reload()
          })
      }
    }

    $scope.submitStrength = function (date, intensity, category, value, measurement, points) {
      var username = $cookies.get('username')
      if (!date || !intensity || !category || !value || !measurement || !points) {
        console.log('Form not valid')
      } else {
        $uibModalInstance.dismiss('cancel')
        GoalsFactory.postLog('strength', date, intensity, category, value, measurement, username, points)
          .then(function (data) {
            console.log('strength goal submitted', data)
            $state.reload()
          })
      }
    }


  })

