angular.module('myApp.dashboard', [])

  .controller('dashboardCtrl', function ($scope, $rootScope, $state, GoalsFactory, $cookies, ProfileFactory, StrengthFactory, NutritionFactory, $uibModal) {
    $scope.animationsEnabled = true
    $scope.username = $cookies.get('username')
    $rootScope.hideit = false
    $rootScope.landing = false
    $scope.calorieIntake = null

    $rootScope.signout = function () {
      $scope.signout()
    }

    $scope.goalsData = null
    $scope.dash = null

    $scope.signout = function () {
      $cookies.remove('token')
      $cookies.remove('username')
      console.log('token after remove: ', $cookies.get('token'))
      $state.go('landing')

    }

    $scope.inputGoal = function () {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/dashboard/sub-views/goals/goals-modal.html',
        controller: 'selectGoalCtrl'
      })
    }


    $scope.init = function () {
      $rootScope.dashboard = true;
    }

    $scope.init()

  })
  .directive('tooltip', function(){
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        $(element).hover(function(){
          $(element).tooltip('show')
        }, function(){
          $(element).tooltip('hide')
        })
      }
    }
  })

