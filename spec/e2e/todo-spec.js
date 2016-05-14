describe('Protractor Demo App', function () {
  var signUpButton = element(by.id('landingSignUpButton'))
  var usernameInput = element(by.id('usernameSignup'))
  var passwordInput = element(by.id('passwordSignup'))
  var submitSignup = element(by.id('submitSignupForm'))

  var age = element(by.id('ageSignup'))
  var height = element(by.id('heightSignup'))
  var weight = element(by.id('weightSignup'))
  var gender = element(by.className('genderSignupMale'))
  var activity = element(by.id('activitySignupSedentary'))
  var interest = element(by.id('interestSignupCardio'))
  var gym = element(by.id('gymSignup24'))
  var submitProfile = element(by.id('registerProfileSubmit'))
  var goProfile = element(by.className('profileNavigator'))
  var profileUsername = element(by.id('profileUsername'))
  // beforeEach(function () {
  //   browser.get('http://juliemr.github.io/protractor-demo/')
  // })
  // beforeEach(function(){
  //   browser.get('http://localhost:8080/#/');
  // })

  //for repeater
  // var phoneList = element.all(by.repeater('phone in phones'));
  //for model
  //var query = element(by.model('query'));
  it('should be able to signup', function () {
    browser.get('http://localhost:8080/#/');
    signUpButton.click()
    usernameInput.sendKeys('cuteElephant')
    passwordInput.sendKeys('cuteElephant')
    submitSignup.click()
    age.sendKeys(50)
    height.sendKeys(70)
    gender.click()
    activity.click()
    gym.click()
    submitProfile.click()
    goProfile.click()
    expect(profileUsername).toEqual('Name: ')

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
