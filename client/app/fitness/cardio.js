angular.module('myApp.cardio', ['factories'])
  .controller('CardioCtrl', function ($scope, cardioFactory, AuthFactory, $cookies, $state, $uibModal) {
    var user = $cookies.get('username')
    $scope.animationsEnabled = true

    $scope.inputCardio = function () {
      $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'app/fitness/cardioModal.html',
        controller: 'CardioModalCtrl'
      })
    }

    $scope.cardioData = null

    $scope.shortenDate = function (date) {
      // console.log('date inside shortenDate', date)
      var dateArr = date.split("")
      // console.log('date after split: ', dateArr)
      return dateArr.splice(0, 10).join("")
    }

    $scope.cardioList = function () {
      cardioFactory.getCardio(user).then(function (data) {
        // data.data.forEach(function (item) {
        //   item.date = item.date.slice(0, 10)
        // })
        console.log('cardioList data =', data)
        $scope.cardioData = data.data
      })
    }

    $scope.init = function () {
      $scope.cardioList()
    }

    $scope.init()

  })
