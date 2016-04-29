angular.module('myApp', ['myApp.signin', 'myApp.landing', 'myApp.signup', 'myApp.profile', 'ui.router', 'factories'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('landing')

    $stateProvider
      .state('signup', {
        url: '/',
        templateUrl: '/app/signup/signup.html',
        controller: 'SignupCtrl'
      })
      .state('signin', {
        url: '/signin',
        templateUrl: '/app/signin/signin.html',
        controller: 'SigninCtrl'
      })
      .state('profile', {
        url: '/profile',
        templateUrl: '/app/profile/profile.html',
        controller: 'ProfileCtrl'
      })
      .state('landing', {
        url: '/landing',
        templateUrl: '/app/landing/landing.html',
        controller: 'LandingCtrl'
      })
  })
