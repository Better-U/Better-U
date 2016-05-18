angular.module('myApp.modal', [])

  .controller('ModalCtrl', function ($scope, $uibModalInstance) {
    // Used to close modals
    $scope.ok = function () {
      $uibModalInstance.close()
    }
    // Used to dismiss modals
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel')
    }
  })
