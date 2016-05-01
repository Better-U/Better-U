angular.module('myApp', ['myApp.signin', 'myApp.landing', 'myApp.signup', 'myApp.profile', 'myApp.nutrition', 'ui.router', 'factories', 'myApp.dashboard', 'myApp.modal', 'ui.bootstrap', 'ngAnimate'])

  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('landing')

    $stateProvider
      .state('signup', {
        url: '/signup',
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
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/app/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      })
      .state('cardio', {
        url: '/cardio',
        templateUrl: '/app/fitness/cardio.html',
        controller: 'CardioCtrl'
      })
      .state('strength', {
        url: '/strength',
        templateUrl: '/app/fitness/strength.html',
        controller: 'StrengthCtrl'
      })
      .state('registerProfile', {
        url: '/registerProfile',
        templateUrl: '/app/signup/registerProfile.html',
        controller: 'SignupCtrl'
      })
      .state('nutrition', {
        url: '/nutrition',
        templateUrl: '/app/nutrition/nutrition.html',
        controller: 'NutritionCtrl'
      })
  })
