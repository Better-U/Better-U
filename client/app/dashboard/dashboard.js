angular.module('myApp.dashboard', [])

  .controller('dashboardCtrl', function ($scope, $rootScope, $state, GoalsFactory, $cookies, ProfileFactory, StrengthFactory, NutritionFactory, $uibModal, filepickerService, AuthFactory, cardioFactory) {
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
      // $rootScope.hideit = true
      $state.go('landing')

    }


    $scope.getCalories = function (data) {
      var pastDays = $scope.getPastSevenDays()
      var results = []
      var sum = 0
      for (var i = 0; i < pastDays.length; i++) {
        sum = 0
        for (var j = 0; j < data.length; j++) {
          if ($scope.shortDateConverter(data[j].date) === pastDays[i]) {
            sum += Number(data[j].cal)
          }
        }
        results.push(sum)
      }

      $scope.calorieIntake = results
      return $scope.calorieIntake
    }



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

