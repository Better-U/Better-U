angular.module('myApp', ['myApp.login', 'myApp.landing', 'myApp.profile', 'ui.router', 'factories'])


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
      .state('profile', {
        url: '/profile',
        templateUrl: '/app/profile/profile.html',
        controller: 'ProfileCtrl'
      })
  })
