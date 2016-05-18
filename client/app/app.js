angular.module('myApp', ['myApp.signin',
  'myApp.landing',
  'myApp.signup',
  'myApp.cardio',
  'myApp.cardioModal',
  'myApp.profile',
  'myApp.nutrition',
  'myApp.nutritionModal',
  'myApp.strength',
  'myApp.strengthModal',
  'myApp.bet',
  'ui.router',
  'factories',
  'myApp.dashboard',
  'myApp.modal',
  'ui.bootstrap',
  'ngAnimate',
  'ngCookies',
  'myApp.social',
  'myApp.socialFactoryModule',
  'myApp.goals',
  'angular-filepicker',
  'chatModule',
  'app.AuthFactory',
  'app.ProfileFactory',
  'app.StrengthFactory',
  'app.NutritionFactory',
  'luegg.directives',
  'myApp.nutritionGraphs',
  'myApp.cardioGraphs',
  'myApp.strengthGraphs',
  'myApp.calculations',
  'myApp.goalsModal',
  'myApp.selectGoal'])

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
        authenticate: true,
        views: {
          '': {
            templateUrl: '/app/dashboard/dashboard.html',
            controller: 'dashboardCtrl'
          },
          'nutritionGraphs@dashboard': {
            templateUrl: '/app/dashboard/sub-views/graphs/nutrition-graphs.html',
            controller: 'nutritionGraphsCtrl'
          },
          'nutritionIntake@dashboard': {
            templateUrl: '/app/dashboard/sub-views/calculations/nutrition-calculations.html',
            controller: 'nutritionGraphsCtrl'
          },
          'cardioGraphs@dashboard': {
            templateUrl: '/app/dashboard/sub-views/graphs/cardio-graphs.html',
            controller: 'cardioGraphsCtrl'
          },
          'strengthGraphs@dashboard': {
            templateUrl: '/app/dashboard/sub-views/graphs/strength-graphs.html',
            controller: 'strengthGraphsCtrl'
          },
          'calculations@dashboard': {
            templateUrl: '/app/dashboard/sub-views/calculations/calculations.html',
            controller: 'calculationsCtrl'
          },
          'goals@dashboard': {
            templateUrl: '/app/dashboard/sub-views/goals/goals.html',
            controller: 'goalsCtrl'
          },
          'strengthGraphs2@dashboard': {
            templateUrl: '/app/dashboard/sub-views/graphs/strength-graphs2.html',
            controller: 'strengthGraphsCtrl'
          }
        }
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
      .state('nutritionModal', {
        url: '/nutritionModal',
        templateUrl: '/app/nutrition/nutritionModal.html',
        controller: 'NutritionModalCtrl',
        authenticate: true
      })
      .state('social', {
        url: '/social',
        templateUrl: '/app/social/social.html',
        controller: 'socialCtrl',
        authenticate: true
      })
      .state('chatRoom', {
        params: null,
        url: '/chatRoom',
        templateUrl: '/app/social/chat.html',
        controller: 'chatCtrl',
        authenticate: true
      })
      .state('bet', {
        url: '/bet',
        templateUrl: '/app/bet/bet.html',
        controller: 'betCtrl',
        authenticate: true
      })
  })

  .config(function ($httpProvider, filepickerProvider) {
    filepickerProvider.setKey(fileStackAPI)
    $httpProvider.defaults.headers.common['Access']
    $httpProvider.interceptors.push(function ($timeout, $q, $cookies, $injector) {
      return {
        responseError: function (rejection) {
          if (rejection.status === 401) {
            $injector.get('$state').transitionTo('landing')
            return $q.reject(rejection)
          }
        }
      }
    })
  })

  .run(function ($rootScope, $state, AuthFactory, $cookies) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      var requireLogin = toState.authenticate
      if (requireLogin && AuthFactory.getToken() === null) {
        event.preventDefault()
        $state.go('landing')
      } else if (requireLogin && !AuthFactory.isAuth()) {
        $cookies.remove('username')
        $cookies.remove('token')
        event.preventDefault()
        $state.go('landing')
      }
    })
  })
