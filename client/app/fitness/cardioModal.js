angular.module('myApp.cardioModal', ['factories'])
  .controller('CardioModalCtrl', function ($scope, cardioFactory, AuthFactory, $cookies, $state, $uibModal, $uibModalInstance) {
    $scope.animationsEnabled = true
    $scope.noInput = false
    var user = $cookies.get('username')

    $scope.format = 'dd-MMMM-yyyy'

    $scope.open1 = function () {
      $scope.popup1.opened = true
    }

    $scope.clear = function () {
      $scope.date = null
    }
    $scope.popup1 = {
      opened: false
    }

    $scope.pace = function (duration, distance) {
      if (duration === undefined || distance === undefined) {
        return 0
      } else {
        var convertSeconds = duration * 60
        var pace = ((convertSeconds / distance) / 60).toFixed(2)
        return pace
      }
    }

    $scope.convertMiles = function (meters) {
      if (meters > 0) {
        var convert = meters * 0.000621371
        return convert.toFixed(2)
      } else {
        return 0
      }
    }

    $scope.convertTime = function formatDate (date) {
      var d = new Date(date)
      var hh = d.getHours()
      var m = d.getMinutes()
      var s = d.getSeconds()
      var dd = 'AM'
      var h = hh
      if (h >= 12) {
        h = hh - 12
        dd = 'PM'
      }
      if (h == 0) {
        h = 12
      }
      m = m < 10 ? '0' + m : m

      s = s < 10 ? '0' + s : s

      // if you want 2 digit hours:
      h = h < 10 ? '0' + h : h

      return (h + ':' + m + ' ' + dd)
    }

    $scope.submitCardio = function () {
      if ($scope.date === undefined || $scope.distance === undefined || $scope.duration === undefined || $scope.type === undefined) {
        $scope.noInput = true
      } else {
        var pace = $scope.pace($scope.duration, $scope.distance)
        $uibModalInstance.dismiss('cancel')
        var newTime = new Date($scope.time).getTime()
        var convertedTime = $scope.convertTime(newTime)
        cardioFactory.submitCardio(user, $scope.date, convertedTime, $scope.type[0], $scope.distance, $scope.duration, pace, $scope.intensity)
          .then(function (data) {
            $state.reload()
          })
      }
    }
  })
  .directive('datetimepickerNeutralTimezone', function () {
    return {
      restrict: 'A',
      priority: 1,
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        ctrl.$formatters.push(function (value) {
          var date = new Date(Date.parse(value))
          date = new Date(date.getTime() + (60000 * date.getTimezoneOffset()));
          return date
        })

        ctrl.$parsers.push(function (value) {
          var date = new Date(value.getTime() - (60000 * value.getTimezoneOffset()));
          return date
        })
      }
    }
  })
  .directive('datepickerLocaldate', ['$parse', function ($parse) {
          var directive = {
              restrict: 'A',
              require: ['ngModel'],
              link: link
          };
          return directive;

          function link(scope, element, attr, ctrls) {
              var ngModelController = ctrls[0];

              // called with a JavaScript Date object when picked from the datepicker
              ngModelController.$parsers.push(function (viewValue) {
                  // undo the timezone adjustment we did during the formatting
                  viewValue.setMinutes(viewValue.getMinutes() - viewValue.getTimezoneOffset());
                  // we just want a local date in ISO format
                  return viewValue.toISOString().substring(0, 10);
              });

              // called with a 'yyyy-mm-dd' string to format
              ngModelController.$formatters.push(function (modelValue) {
                  if (!modelValue) {
                      return undefined;
                  }
                  // date constructor will apply timezone deviations from UTC (i.e. if locale is behind UTC 'dt' will be one day behind)
                  var dt = new Date(modelValue);
                  // 'undo' the timezone offset again (so we end up on the original date again)
                  dt.setMinutes(dt.getMinutes() + dt.getTimezoneOffset());
                  return dt;
              });
          }
      }]);
