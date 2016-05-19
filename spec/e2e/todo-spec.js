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

  // var goProfile = element(by.className('profileNavigator'))
  // var profileUsername = element(by.id('profileUsername'))
  // beforeEach(function () {
  //   browser.get('http://juliemr.github.io/protractor-demo/')
  // })
  beforeEach(function () {
    browser.get('http://betteru.pro/')
  })

  // for repeater
  // var phoneList = element.all(by.repeater('phone in phones'));
  // for model
  // var query = element(by.model('query'));
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

  // webdriver.wait(expect(welcomed.getText()).toEqual('Welcome back, cuteElephant7!'), 5000)
  it('should be able to sign in', function () {
    var EC = protractor.ExpectedConditions

    signInButton.click()
    signinUsername.sendKeys('Jane Fong')
    signinPassword.sendKeys('Jane Fong')
    signinSubmit.click()

    var welcomed = element(by.binding('username'))
    browser.wait(EC.visibilityOf(welcomed), 2000000)

    // cardioRoute.click()
    // var cardioHeader = element(by.className('cardioHeadingHeader'))

    // browser.wait(EC.visibilityOf(cardioHeader), 2000000)

    // var inputCardioButton = element(by.className('callInputCardio'))
    // inputCardioButton.click()

    // var date = element(by.model('date'))
    // var time = element(by.className('uib-increment.minutes'))
    // var run = element(by.id('runningPicker'))
    // var distance = element(by.model('distance'))
    // var duration = element(by.model('duration'))
    // var intensity = element(by.id('intensityOf1'))
    // var submitCardio = element(by.id('submitCardioModal'))

    // browser.wait(EC.visibilityOf(date), 2000)

    // date.sendKeys('24-May-2016')
    // time.click()
    // run.click()
    // distance.sendKeys(5)
    // duration.sendKeys(5)
    // intensity.click()
    // submitCardio.click()

    // var elm = element.all(by.repeater('cardio in cardioData')).last()

    // browser.wait(EC.visibilityOf(elm), 2000)

    // // .column(cardio.date)
    // // .last()

    // browser.wait(EC.visibilityOf(elm), 2000)
    // expect(elm.getText()).toEqual('24-May-2016')
  })

  it('should be able to log strength', function () {
    var EC = protractor.ExpectedConditions
    // browser.get('http://betteru.pro/#/strength')
    var strengthLog = element(by.css('[ng-click="inputNutrition()"]'))

    var strengthHeader = element(by.className('strengthHeader'))
    browser.wait(EC.visibilityOf(strengthHeader), 2000000)

    var inputStrengthButton = element(by.className('callStrength'))
    inputStrengthButton.click()

    var strengthDate = element(by.model('date'))
    var bench = element(by.id('bench'))
    var strengthWeight = element(by.model('str.weight'))
    var strengthReps = element(by.model('str.reps'))
    var strengthSets = element(by.model('str.sets'))
    var strengthDuration = element(by.model('str.duration'))
    var strengthIntensity = element(by.id('intensity2'))
    var submitStrength = element(by.id('submitStrength'))

    browser.wait(EC.visibilityOf(strengthDate), 2000)
    strengthDate.sendKeys('20-May-2016')
    bench.click()
    strengthWeight.sendKeys(210)
    strengthReps.sendKeys(7)
    strengthSets.sendKeys(10)
    strengthDuration.sendKeys(60)
    strengthIntensity.click()
    submitStrength.click()

    var elm = element.all(by.repeater('str in strengthList')).last()
    browser.wait(EC.visibilityOf(elm), 2000)
    expect(elm.getText()).toEqual('19-May-2016')
  })

  // goProfile.click()
  // expect(profileUsername).toEqual('Name: ')
})

  // it('should add one and two', function () {
  //   inputer1.sendKeys('eric')
  //   inputer2.sendKeys('so')
  //   query.clear();
  //   submitter.click()
  //   expect(phoneList.count()).toBe(2);
  //   expect(nameHolder.getText()).toEqual('eric')
  // })
