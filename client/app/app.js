angular.module('myApp', ['myApp.login', 'myApp.landing', 'ui.router'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/')

    $stateProvider
      .state('landing', {
        url: '/',
        templateUrl: '/app/landing/landing.html',
        controller: 'LandingCtrl'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/app/login/login.html',
        controller: 'LoginCtrl'
      })
  })
