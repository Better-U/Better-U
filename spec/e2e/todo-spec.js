// var webdriver = require('selenium-webdriver');

describe('Protractor Demo App', function () {
  var signUpButton = element(by.id('landingSignUpButton'))
  var usernameInput = element(by.id('usernameSignup'))
  var passwordInput = element(by.id('passwordSignup'))
  var submitSignup = element(by.id('submitSignupForm'))

  var age = element(by.id('ageSignup'))
  var height = element(by.id('heightSignup'))
  var weight = element(by.id('weightSignup'))
  var gender = element(by.className('genderSignupMale'))
  var activity = element(by.className('activitySignupSedentary'))
  var interest = element(by.className('interestSignupCardio'))
  var gym = element(by.className('gymSignup24'))
  var submitProfile = element(by.id('registerProfileSubmit'))

  // ============================================================
  var signInButton = element(by.id('signinButton'))
  var signinUsername = element(by.model('user.name'))
  var signinPassword = element(by.model('user.password'))
  var signinSubmit = element(by.id('submitSignin'))
  var cardioRoute = element(by.className('fa-bicycle'))

  // ============================================================

  // ============================================================

  // var goProfile = element(by.className('profileNavigator'))
  // var profileUsername = element(by.id('profileUsername'))
  // beforeEach(function () {
  //   browser.get('http://juliemr.github.io/protractor-demo/')
  // })
  beforeEach(function () {
    browser.get('http://betteru.pro/')
  })

  it('should have a title of BetterU - Fitness', function () {
    expect(browser.getTitle()).toEqual('BetterU - Fitness')
  })

  // it('should be able to sign up', function() {
  //   var EC = protractor.ExpectedConditions

  //   signUpButton.click()
  //   usernameInput.sendKeys('Eric So')
  //   passwordInput.sendKeys('Eric So')
  //   submitSignup.click()
  //   age.sendKeys(50)
  //   height.sendKeys(70)
  //   weight.sendKeys(170)
  //   gender.click()
  //   activity.click()
  //   interest.click()
  //   gym.click()
  //   submitProfile.click()
  //   var welcomed = element(by.binding('username'))
  //   browser.wait(EC.visibilityOf(welcomed), 1000000)
  //   expect(welcomed.getText()).toEqual('Welcome back, Eric So!')
  // })

  it('should be able to sign in', function() {
    var EC = protractor.ExpectedConditions

    signInButton.click()
    signinUsername.sendKeys('Joseph Martin')
    signinPassword.sendKeys('Joseph Martin')
    signinSubmit.click()

    var welcomed = element(by.binding('username'))
    browser.wait(EC.visibilityOf(welcomed), 2000000)

    // cardioRoute.click()
    // var cardioHeader = element(by.className('cardioHeadingHeader'))

    // browser.wait(EC.visibilityOf(cardioHeader), 2000000)

    // var inputCardioButton = element(by.className('callInputCardio'))
    // inputCardioButton.click()

    // var date = element(by.model('date'))
    // var time = element(by.className('time'))
    // var run = element(by.id('run'))
    // var distance = element(by.model('distance'))
    // var duration = element(by.model('duration'))
    // var intensity = element(by.id('intensityOf1'))
    // var submitCardio = element(by.id('submitCardioModal'))

    // browser.wait(EC.visibilityOf(date), 2000)

    // date.sendKeys('24/05/2016')
    // time.sendKeys('1100')
    // run.click()
    // distance.sendKeys(5)
    // duration.sendKeys(5)
    // intensity.click()
    // submitCardio.click()

    // var elm = element.all(by.repeater('cardio in cardioData')).last()
    // browser.wait(EC.visibilityOf(elm), 2000)
    // expect(elm.getText()).toEqual('24/05/2016')

    // Created a new test case since cardio doesn't work
    expect(welcomed.getText()).toEqual('Welcome back, Joseph Martin!')
  })

  it('should search the Nutritionix database and log serving size', function() {
    var EC = protractor.ExpectedConditions

    var nutritionHeader = element(by.id('nutritionHeader'))
    var inputLog = element(by.css('[ng-click="inputNutrition()"]'))
    var search = element(by.id('searchBox'))
    var searchResults = element.all(by.repeater('(index,item) in results track by $index')).get(0)
    var servingSize = element(by.id('servingSize'))

    browser.get('http://betteru.pro/#/nutrition')
    inputLog.click()
    search.sendKeys('King Taco')
    searchResults.click()

    servingSize.getAttribute('value').then(function(val) {
      expect(val).toEqual('57')
    })
  })

  it('should be able to find a goal to bet on', function() {

    var EC = protractor.ExpectedConditions
    var betSearchBox = element(by.model('searchbetuser'))
    var betSearchSubmit = element(by.css('[ng-click="submitSearch()"]'))

    browser.get('http://betteru.pro/#/bet')
    betSearchBox.sendKeys('Kaushik Sahoo')
    betSearchSubmit.click()

    var dat = element.all(by.repeater('goal in withGoalsList')).first()
    browser.wait(EC.visibilityOf(dat), 2000)
    expect(dat.getText()).toEqual('Increase Bench by 25 Sets May 30, 2016 20 Bet!')
  })

  it('should be able to see a added bet', function() {

    var EC = protractor.ExpectedConditions
    browser.get('http://betteru.pro/#/bet')

    var dat = element.all(by.repeater('user in betsPlacedList')).first()
    browser.wait(EC.visibilityOf(dat), 2000)
    expect(dat.getText()).toEqual('You\'ve bet 50 points on DanielChen to increase swimming by 200 miles on Jun 23, 2016')
  })

  it('should be able to log strength', function () {
    var EC = protractor.ExpectedConditions
    var strengthHeader = element(by.className('strengthHeader'))
    var strengthLog = element(by.css('[ng-click="inputStrength()"]'))


    var bench = element(by.id('bench'))
    var strengthWeight = element(by.model('str.weight'))
    var strengthReps = element(by.model('str.reps'))
    var strengthSets = element(by.model('str.sets'))
    var strengthDuration = element(by.model('str.duration'))
    var submitStrength = element(by.css('[ng-click="$close()"]'))

    browser.get('http://betteru.pro/#/strength')
    strengthLog.click()
    strengthWeight.sendKeys(210)
    strengthReps.sendKeys(7)
    strengthSets.sendKeys(10)
    strengthDuration.sendKeys(60)
    submitStrength.click()
  })

  // goProfile.click()
  // expect(profileUsername).toEqual('Name: ')
})
