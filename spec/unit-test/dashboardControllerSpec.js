describe('Dashboard Controller', function () {

  beforeEach(module('myApp'))
  beforeEach(module('myApp.dashboard'))
  beforeEach(module('ui.router'))

  var $rootScope, $controller, dashboardController

  beforeEach(function () {
    inject(function(_$controller_, $scope, _$rootScope_, $state, $cookies, ProfileFactory, NutritionFactory, $uibModal, filepickerService, AuthFactory, cardioFactory) {
      $controller = _$controller_
      $rootScope = _$rootScope_
      $scope = $rootScope.$new()
      dashboardController = $controller('DashboardCtrl', {'$rootScope' : $rootScope, '$scope': $scope, '$state': $state, '$cookies': $cookies, 'ProfileFactory': ProfileFactory, 'NutritionFactory': NutritionFactory,
      '$uibModal': $uibModal, 'filepickerService': filepickerService, 'AuthFactory': AuthFactory, 'cardioFactory': cardioFactory});
    })
  })

  it('should exist', function() {
    expect(dashboardController).toBeDefined()
  })
})
