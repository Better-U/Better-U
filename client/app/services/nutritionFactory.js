angular.module('app.NutritionFactory', [])

  .factory('NutritionFactory', function ($http) {
    function submitFoodLog (username, name, date, time, serving, size, cal, carbs, fat, fiber, sodium, protein, water) {
      var foodLog = {
        username: username,
        name: name,
        date: date,
        time: time,
        serving: serving,
        size: size,
        cal: cal,
        carbs: carbs,
        fat: fat,
        fiber: fiber,
        sodium: sodium,
        protein: protein,
        water: water
      }
      return $http.post('/api/health/nutrition', foodLog)
    }

    function searchFoodDB (query) {
      if (query !== '') {
        return $http.get('https://api.nutritionix.com/v1_1/search/' + query + '?results=0%3A50&fields=item_name,brand_name,nf_calories&appId=' + appID + '&appKey=' + appKey)
      }
    }

    function getNutrition (id) {
      var req = {
        url: 'https://api.nutritionix.com/v1/item/' + id + '?&appId=' + appID + '&appKey=' + appKey,
        method: 'GET',
        headers: { 'Content-Type': 'application/json; charset=utf-8' }
      }
      return $http(req)
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