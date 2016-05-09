angular.module('angular-filepicker', [])

.factory('filepickerService', function($window){
  return $window.filepicker
})

  .config(function (filepickerService) {
    filepickerService.setKey('A1AHZqBOeQWiZp6ExRISUz');
  });