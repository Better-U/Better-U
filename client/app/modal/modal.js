angular.module('myApp.modal', [])

  .controller('ModalCtrl', function ($scope, $uibModalInstance) {
    $scope.selected = {
      item: $scope.items[0]
    }

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item)
    }

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }
  })
