describe('Protractor Demo App', function () {
  var inputer1 = element(by.id('input1'))
  var inputer2 = element(by.id('input2'))
  var submitter = element(by.id('submit'))
  var nameHolder = element(by.id('nameHolder'))
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
  it('should have a title', function () {


    expect(browser.getTitle()).toEqual('Fitness')
  })

  it('should add one and two', function () {
    inputer1.sendKeys('eric')
    inputer2.sendKeys('so')
    query.clear();
    submitter.click()
    expect(phoneList.count()).toBe(2);
    expect(nameHolder.getText()).toEqual('eric')
  })
})
