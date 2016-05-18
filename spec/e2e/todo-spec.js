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


  // var goProfile = element(by.className('profileNavigator'))
  // var profileUsername = element(by.id('profileUsername'))
  // beforeEach(function () {
  //   browser.get('http://juliemr.github.io/protractor-demo/')
  // })
  beforeEach(function(){
    browser.get('http://localhost:8080/#/');
  })

  //for repeater
  // var phoneList = element.all(by.repeater('phone in phones'));
  //for model
  //var query = element(by.model('query'));
  it('should have a title of BetterU - Fitness', function () {
  expect(browser.getTitle()).toEqual('BetterU - Fitness');
  })
  it('should be able to sign up', function(){
    // browser.get('http://localhost:8080/#/');
    signUpButton.click()
    usernameInput.sendKeys('cuteElephant12')
    passwordInput.sendKeys('cuteElephant12')
    submitSignup.click()
    age.sendKeys(50)
    height.sendKeys(70)
    weight.sendKeys(170)
    gender.click()
    activity.click()
    interest.click()
    gym.click()
    submitProfile.click()
    browser.waitForAngular()
        var welcomed = element(by.id('welcomeUser'))
    expect(welcomed.getText()).toEqual('Welcome back, cuteElephant12!')
    // webdriver.wait(expect(welcomed.getText()).toEqual('Welcome back, cuteElephant7!'), 5000)
    

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
})
