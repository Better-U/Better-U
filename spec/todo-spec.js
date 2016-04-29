describe('Protractor Demo App', function () {
  var inputer1 = element(by.id('input1'))
  var inputer2 = element(by.id('input2'))
  var submitter = element(by.id('submit'))
  var nameHolder = element(by.id('nameHolder'))
  // beforeEach(function () {
  //   browser.get('http://juliemr.github.io/protractor-demo/')
  // })

  it('should have a title', function () {
    browser.get('http://localhost:8080/#/')

    expect(browser.getTitle()).toEqual('Fitness')
  })

  it('should add one and two', function () {
    browser.get('http://localhost:8080/#/')
    inputer1.sendKeys("eric")
    inputer2.sendKeys("so")

    submitter.click()

    expect(nameHolder.getText()).toEqual("eric")

  })


})
