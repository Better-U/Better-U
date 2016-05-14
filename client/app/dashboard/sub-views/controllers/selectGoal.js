angular.module('myApp.selectGoal', [])

  .controller('selectGoalCtrl', function ($scope, GoalsFactory, $cookies, $state, $uibModal, $uibModalInstance) {

    $scope.selectGoal = function (type) {
      if (type === 'cardio') {
        $uibModalInstance.dismiss('cancel')
        $uibModal.open({
          templateUrl: 'app/dashboard/sub-views/goals/cardio-goals.html',
          controller: 'goalsModalCtrl'
        })
      } else if (type === 'strength') {
        $uibModalInstance.dismiss('cancel')
        $uibModal.open({
          templateUrl: 'app/dashboard/sub-views/goals/strength-goals.html',
          controller: 'goalsModalCtrl'
        })
      }
    }


  })

