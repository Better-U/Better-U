angular.module('myApp.goals', [])

  .controller('GoalsCtrl', function ($scope, GoalsFactory, $cookies, $state, $uibModal, $uibModalInstance) {
    $scope.animationsEnabled = true
    $scope.added = false
    $scope.disabled = false

    $scope.selectGoal = function(type) {
      if (type === 'cardio') {
        $uibModalInstance.dismiss('cancel')
        $uibModal.open({
          templateUrl: 'app/dashboard/directives/cardio-goals.html',
          controller: 'GoalsCtrl'
        })
      } else if (type === 'strength') {
        $uibModalInstance.dismiss('cancel')
        $uibModal.open({
          templateUrl: 'app/dashboard/directives/strength-goals.html',
          controller: 'GoalsCtrl'
        })
      } else if (type === 'nutrition') {
        $uibModalInstance.dismiss('cancel')
        $uibModal.open({
          templateUrl: 'app/dashboard/directives/nutrition-goals.html',
          controller: 'GoalsCtrl'
        })
      }
    }

    $scope.submitCardio = function (date, intensity, category, value, measurement) {
      console.log('calling submit cardio')
      var username = $cookies.get('username')
      if (!date || !intensity || !category || !value || !measurement) {
        console.log('Form not valid')
      } else {

        GoalsFactory.postLog('cardio', date, intensity, category, value, measurement, username)
          .then(function (data) {
            console.log('cardio goal submitted', data)

            $state.reload()
          })
      }

    }

    $scope.hello = function () {
      console.log('hello')
    }

    $scope.submitStrength = function (date, intensity, category, value, measurement) {
      var username = $cookies.get('username')
      if (!date || !intensity || !category || !value || !measurement) {
        console.log('Form not valid')
      } else {
        GoalsFactory.postLog('strength', date, intensity, category, value, measurement, username)
          .then(function (data) {
            console.log('strength goal submitted', data)
            // $state.reload()
          })
      }
    }

    $scope.submitNutrition = function (date, intensity, category, value, measurement) {
      var username = $cookies.get('username')
      if (!date || !intensity || !category || !value || !measurement) {
        console.log('Form not valid')
      } else {
        GoalsFactory.postLog('nutrition', date, intensity, category, value, measurement, username)
          .then(function (data) {
            console.log('nutrition goal submitted', data)
            // $state.reload()
          })
      }
    }

  })
  .directive('cardioGoals', function () {
    return {
      templateUrl: 'app/dashboard/directives/cardio-goals.html',
      controller: 'GoalsCtrl'
    }
  })

  .directive('strengthGoals', function () {
    return {
      templateUrl: 'app/dashboard/directives/strength-goals.html',
      controller: 'GoalsCtrl'
    }
  })

  .directive('nutritionGoals', function () {
    return {
      templateUrl: 'app/dashboard/directives/nutrition-goals.html',
      controller: 'GoalsCtrl'
    }
  })
