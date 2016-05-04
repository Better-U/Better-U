angular.module('myApp', ['myApp.signin', 'myApp.landing', 'myApp.signup', 'myApp.cardio', 'myApp.profile', 'myApp.nutrition', 'myApp.strength', 'ui.router', 'factories', 'myApp.dashboard', 'myApp.modal', 'ui.bootstrap', 'ngAnimate', 'ngCookies', 'myApp.social', 'myApp.socialFactoryModule', 'myApp.goals', 'ngMaterial', 'myApp.chatModule'])

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
      .state('social', {
        url: '/social',
        templateUrl: '/app/social/social.html',
        controller: 'socialCtrl',
        authenticate: true
      })
      .state('goals', {
        url: '/goals',
        templateUrl: '/app/goals/goals.html',
        controller: 'GoalsCtrl',
        authenticate: true
      })
      .state('chatRoom', {
        url: '/chatRoom',
        templateUrl: '/app/social/chat.html',
        controller: 'chatCtrl',
        authenticate: true
      })
  })

  .config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($timeout, $q, $cookies, $injector) {
      return {
        request: function (config) {
          config.headers['Token'] = $cookies.get('token')
          return config
        },
        responseError: function (rejection) {
          console.log(rejection)
          if (rejection.status === 401) {
            $injector.get('$state').transitionTo('landing')
            return $q.reject(rejection)
          }
        }
      }
    })
  })

  .run(function ($rootScope, $state, authFactory, $cookies) {
    $rootScope.$on('$stateChangeStart', function (event, toState) {
      var requireLogin = toState.authenticate
      console.log('tostate: ', toState.url)
      if (requireLogin && authFactory.getToken() === null) {
        event.preventDefault()
        $state.go('landing')
      }
      else if (requireLogin && !authFactory.isAuth()) {
        $cookies.remove('token')
        $cookies.remove('username')
        event.preventDefault();
        $state.go('landing')
      }
    })
  })
