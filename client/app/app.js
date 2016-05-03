angular.module('myApp', ['myApp.signin', 'myApp.landing', 'myApp.signup', 'myApp.cardio', 'myApp.profile', 'myApp.strength', 'ui.router', 'factories', 'myApp.dashboard', 'myApp.modal', 'ui.bootstrap', 'ngAnimate'])

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
        controller: 'ProfileCtrl',
        authenticate: true
      })
      .state('landing', {
        url: '/landing',
        templateUrl: '/app/landing/landing.html',
        controller: 'LandingCtrl'
      })
      .state('dashboard', {
        url: '/dashboard',
        templateUrl: '/app/dashboard/dashboard.html',
        controller: 'DashboardCtrl',
        authenticate: true
      })
      .state('cardio', {
        url: '/cardio',
        templateUrl: '/app/fitness/cardio.html',
        controller: 'CardioCtrl',
        authenticate: true
      })
      .state('strength', {
        url: '/strength',
        templateUrl: '/app/fitness/strength.html',
        controller: 'StrengthCtrl',
        authenticate: true
      })
      .state('registerProfile', {
        url: '/registerProfile',
        templateUrl: '/app/signup/registerProfile.html',
        controller: 'SignupCtrl',
        authenticate: true
      })
      .state('nutrition', {
        url: '/nutrition',
        templateUrl: '/app/nutrition/nutrition.html',
        controller: 'NutritionCtrl',
        authenticate: true
      })
  })

.config(function ($httpProvider) {

  $httpProvider.interceptors.push(function ($timeout, $q) {

    return {
      responseError: function (rejection) {
        if (rejection.status !== 401) {
          return rejection;
        }

        var deferred = $q.defer();

        return deferred.promise;
      }
    };
  });

})

  .run(function ($rootScope, $state, authFactory) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      var requireLogin = toState.authenticate
      if (requireLogin && authFactory.getToken() === null) {
        event.preventDefault()
        $state.go('landing')
      }
      else if (requireLogin && !authFactory.isAuth()) {
        event.preventDefault();
        $state.go('landing')
      }

    })
  })


