var expect    = require("chai").expect;
var calculService = require('../src/service/calculService');

const testData = {
    firstname : 'Luca',
    lastname : 'Debeir',
    annualSalary : 60050,
    superRate : 9
}


describe('Test function of calculService ', function () {
    it('Test name', function() {
      var name = calculService.name(testData.lastname, testData.firstname);
      
      expect(name).to.equal("Debeir Luca");
    })

    it('Test gross-income', function () {
      var grossIncome = calculService.rounded(calculService.grossIncome(testData.annualSalary,12));

      expect(grossIncome).to.equal(5004);
    })

    it('Test income-tax', function () {
      var incomeTax = calculService.rounded(calculService.incomeTax(testData.annualSalary));

      expect(incomeTax).to.equal(922);
    })

    it('Test net-income', function () {
      var grossIncome = calculService.rounded(calculService.grossIncome(testData.annualSalary,12));
      var incomeTax = calculService.rounded(calculService.incomeTax(testData.annualSalary));
      var netIncome = calculService.rounded(calculService.netIncome(grossIncome,incomeTax));

      expect(netIncome).to.equal(4082);
    })

    it('Test super-amount', function () {
      var grossIncome = calculService.rounded(calculService.grossIncome(testData.annualSalary,12));
      var superAmount = calculService.rounded(calculService.superAmount(grossIncome,testData.superRate));

      expect(superAmount).to.equal(450);
    });
});

