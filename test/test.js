var expect    = require("chai").expect;
var calculService = require('../src/service/calculService');

const testgoodData = {
    firstname : 'Luca',
    lastname : 'Debeir',
    annualSalary : 60050,
    superRate : 9
}

const testwrongData = {
  firstname : 'Debeir',
  lastname : 'Luca',
  annualSalary : 60050,
  superRate : 9
}

//GOOD DATA
describe('Test function of calculService with good data', function () {
    it('Test name', function() {
      var fullName = calculService.fullName(testgoodData.lastname, testgoodData.firstname);
      
      expect(fullName).to.equal("Debeir Luca");
    })

    it('Test gross-income', function () {
      var grossIncome = calculService.rounded(calculService.grossIncome(testgoodData.annualSalary,12));

      expect(grossIncome).to.equal(5004);
    })

    it('Test income-tax', function () {
      var incomeTax = calculService.rounded(calculService.incomeTax(testgoodData.annualSalary));

      expect(incomeTax).to.equal(922);
    })

    it('Test net-income', function () {
      var grossIncome = calculService.rounded(calculService.grossIncome(testgoodData.annualSalary,12));
      var incomeTax = calculService.rounded(calculService.incomeTax(testgoodData.annualSalary));
      var netIncome = calculService.rounded(calculService.netIncome(grossIncome,incomeTax));

      expect(netIncome).to.equal(4082);
    })

    it('Test super-amount', function () {
      var grossIncome = calculService.rounded(calculService.grossIncome(testgoodData.annualSalary,12));
      var superAmount = calculService.rounded(calculService.superAmount(grossIncome,testgoodData.superRate));

      expect(superAmount).to.equal(450);
    });
});

//WRONG RESULT
describe('Test function of calculService with wrong data', function () {
  it('Test name', function() {
    var fullName = calculService.fullName(testwrongData.lastname, testwrongData.firstname);
    
    expect(fullName).not.to.equal("Debeir Luca");
  })

  it('Test gross-income', function () {
    var grossIncome = calculService.rounded(calculService.grossIncome(testwrongData.annualSalary,12));

    expect(grossIncome).not.to.equal(5003);
  })

  it('Test income-tax', function () {
    var incomeTax = calculService.rounded(calculService.incomeTax(testwrongData.annualSalary));

    expect(incomeTax).not.to.equal(921);
  })

  it('Test net-income', function () {
    var grossIncome = calculService.rounded(calculService.grossIncome(testwrongData.annualSalary,12));
    var incomeTax = calculService.rounded(calculService.incomeTax(testwrongData.annualSalary));
    var netIncome = calculService.rounded(calculService.netIncome(grossIncome,incomeTax));

    expect(netIncome).not.to.equal(4081);
  })

  it('Test super-amount', function () {
    var grossIncome = calculService.rounded(calculService.grossIncome(testwrongData.annualSalary,12));
    var superAmount = calculService.rounded(calculService.superAmount(grossIncome,testwrongData.superRate));

    expect(superAmount).not.to.equal(449);
  });
});


//TEST FUNCTIONS MISSING ONE ARGUMENT
describe('Test function of calculService with missing one argument', function () {
  it('Test name', function() {
    var fullName = calculService.fullName(testgoodData.firstname);
    
    expect(fullName).not.to.equal("Debeir Luca");
  })

  it('Test gross-income', function () {
    var grossIncome = calculService.rounded(calculService.grossIncome(testgoodData.annualSalary));

    expect(grossIncome).not.to.equal(5004);
  })

  it('Test income-tax', function () {
    var incomeTax = calculService.rounded(calculService.incomeTax());

    expect(incomeTax).not.to.equal(922);
  })

  it('Test net-income', function () {
    var grossIncome = calculService.rounded(calculService.grossIncome(testgoodData.annualSalary));
    var netIncome = calculService.rounded(calculService.netIncome(grossIncome));

    expect(netIncome).not.to.equal(4082);
  })

  it('Test super-amount', function () {
    var superAmount = calculService.rounded(calculService.superAmount(testgoodData.superRate));

    expect(superAmount).not.to.equal(450);
  });
});