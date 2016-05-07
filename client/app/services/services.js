angular.module('factories', [])
  .factory('authFactory', function ($http, $cookies) {
    function registerUserDetails (username, password) {
      var form = {
        username: username,
        password: password
      }
      return $http.post('/api/signup/regUser', form)
    }

    function registerProfileDetails (name, age, height, weight, gender, activity, interest, gym) {
      if (gender === 'male') {
        gender = 0
      } else {
        gender = 1
      }

      var form = {
        username: name,
        age: age,
        height: height,
        weight: weight,
        gender: gender,
        activity: activity,
        interest: interest,
        gym: gym
      }

      return $http.post('/api/signup/regProfile', form)
    }

    function signIn (username, password) {
      var plugin = {
        username: username,
        password: password
      }
      return $http.post('/api/signin', plugin)
    }

    function parseJwt (token) {
      var base64Url = token.split('.')[1]
      var base64 = base64Url.replace('-', '+').replace('_', '/')
      return JSON.parse(window.atob(base64))
    }

    function getToken () {
      return $cookies.get('token')
    }

    function isAuth () {
      var token = getToken()
      if (token) {
        var params = parseJwt(token)
        console.log('exp ', params.exp)
        console.log('time now?', Math.round(new Date().getTime()/1000))
        console.log('token validated: ', Math.round(new Date().getTime() / 1000) <= params.exp)
        return Math.round(new Date().getTime() / 1000) <= params.exp
      } else {
        console.error('No token found')
        return false
      }
    }

    // function attachToken() {
    //   var token = getToken()
    //   var request = {}
    //   if (token) {
    //     request.headers = request.headers || {}
    //     request.headers['x-access-token'] = token
    //   }
    //   return token
    // }

    return {
      getToken: getToken,
      // attachToken: attachToken,
      registerUserDetails: registerUserDetails,
      registerProfileDetails: registerProfileDetails,
      signIn: signIn,
      isAuth: isAuth
    }
  })

  .factory('profileFactory', function ($http) {
    function submitProfile (username, weight, bodyFat, activityLvl, interest, gym) {
      var profileForm = {
        username: username,
        weight: weight,
        bodyFat: bodyFat,
        activityLvl: activityLvl,
        interest: interest,
        gym: gym
      }
      console.log('inside profileFactory submitProfile', profileForm)
      return $http.post('/api/users/profile', profileForm)
    }

    function getProfile (username) {
      var params = {
        username: username
      }
      var config = {
        params: params
      }
      return $http.get('/api/users/profile', config)
    }

    return {
      submitProfile: submitProfile,
      getProfile: getProfile
    }
  })
  .factory('strengthFactory', function ($http) {
    function submitStrength (username, date, type, sets, intensity, duration, weight, reps) {
      var strengthForm = {
        username: username,
        date: date,
        type: type,
        sets: sets,
        intensity: intensity,
        duration: duration,
        weight: weight,
        reps: reps
      }
      console.log('StrengthFactory Submission', strengthForm)
      return $http.post('/api/fitness/strengthForm', strengthForm)
    }
    function getStrength (username) {
      console.log('getStrength line 126')
      return $http.post('/api/fitness/getStrength', {username: username})
    }
    return {
      submitStrength: submitStrength,
      getStrength: getStrength
    }
  })
  .factory('cardioFactory', function ($http) {
    function submitCardio (username, date, type, distance, duration, pace, intensity) {
      var cardioForm = {
        username: username,
        date: date,
        type: type,
        distance: distance,
        duration: duration,
        pace: pace,
        intensity: intensity
      }
      return $http.post('/api/fitness/cardioForm', cardioForm)
    }

    function getCardio (username) {
      var params = {
        username: username
      }

      var config = {
        params: params
      }
      
      return $http.get('/api/fitness/getCardio', config)
    }

    return {
      submitCardio: submitCardio,
      getCardio: getCardio
    }
  })

  .factory('nutritionFactory', function ($http) {
    function submitFoodLog (username, name, date, time, serving, cal, carbs, fat, fiber, sodium, protein, water) {
      var foodLog = {
        username: username,
        name: name,
        date: date,
        time: time,
        serving: serving,
        cal: cal,
        carbs: carbs,
        fat: fat,
        fiber: fiber,
        sodium: sodium,
        protein: protein,
        water: water
      }
      console.log('foodLog =', foodLog)
      return $http.post('/api/health/nutrition', foodLog)
    }

    function searchFoodDB (query) {
      console.log('inside factory searchFoodDB')
      console.log('query =', query)
      if (query !== '') {
        return $http.get('https://api.nutritionix.com/v1_1/search/' + query + '?results=0%3A50&fields=item_name,brand_name,nf_calories&appId=' + appID + '&appKey=' + appKey)
      }
    }

    function getNutrition (id) {
      console.log('inside getNutrition: id =', id)
      return $http.get('https://api.nutritionix.com/v1/item/' + id + '?&appId=' + appID + '&appKey=' + appKey)
    }

    function getFoodLog (username) {
      var params = {
        username: username
      }

      var config = {
        params: params
      }
      return $http.get('/api/health/nutrition', config)
    }

    return {
      submitFoodLog: submitFoodLog,
      searchFoodDB: searchFoodDB,
      getNutrition: getNutrition,
      getFoodLog: getFoodLog
    }
  })

  .factory('GoalsFactory', function ($http) {
    function postLog (type, data, intensity, category, value, measurement, username) {
      var plugin = {
        type: type,
        date: data,
        intensity: intensity,
        category: category,
        value: value,
        measurement: measurement,
        username: username
      }

      console.log('inside postlog service', plugin)

      return $http.post('/api/goals/', plugin)
    }

    function getLog (username) {
      console.log('inside getlog', username)
      var params = {
        username: username
      }
      var config = {
        params: params
      }

      return $http.get('/api/goals/', config)
    }

    function removeLog (id) {
      var params = {
        id: id
      }
      var config = {
        params: params
      }
      return $http.delete('/api/goals/', config)
    }

    return {
      postLog: postLog,
      getLog: getLog,
      removeLog: removeLog
    }
  })
