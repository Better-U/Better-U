describe('LoginCtrl', function () {
  var $scope, $rootScope, createController, $httpBackend

  // using angular mocks, we can inject the injector
  // to retrieve our dependencies
  beforeEach(module('myApp'))
  beforeEach(inject(function ($injector) {
    // mock out our dependencies
    $rootScope = $injector.get('$rootScope')
    $httpBackend = $injector.get('$httpBackend')
    $scope = $rootScope.$new()

    createController = function () {
      return $controller('LoginCtrl', {
        $scope: $scope
      })
    }
  }))

  it('it should have an object used for storage', function () {
    createController()
    expect($scope.data).to.be.an('object')
  })
})
