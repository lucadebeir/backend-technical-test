
const express = require('express')
const router = express.Router()
const calcul = require('./service/calculService')
const { check, validationResult } = require('express-validator/check')
const { matchedData } = require('express-validator/filter')

router.get('/', (req, res) => {
  res.render('form', {
    data: {},
    errors: {},
  })
})

router.post('/form/result', (req, res) => {
  log('Data: ', req);
  res.render("result.ejs", req);
});

router.get('/form', (req, res) => {
  res.render('form', {
    data: {},
    errors: {},
  })
})

router.post('/form', [
  check('firstname')
    .isLength({ min: 1 })
    .not().isNumeric()
    .withMessage('Firstname is required and it\'s a string')
    .trim(),
  check('lastname')
    .isLength({ min: 1 })
    .not().isNumeric()
    .withMessage('Lastname is required and it\'s a string')
    .trim(),
  check('annualSalary')
    .not().isEmpty()
    .isLength({ min: 3 })
    .withMessage('AnnualSalary is required  and it\'s a number > 99')
    .trim(),
  check('superRate','The super-rate must be contain a number between 0 and 12')
    .isIn(["0","1","2","3","4","5","6","7","8","9","10","11","12"])
    .withMessage('SuperRate is a percent, enter a value between 0 and 12')
    .trim(),
  check('paymentStartDate','Select the month payment start')
    .not().isEmpty()
    .withMessage('PaymentStartDate is required, select a month')
    .trim()
  ], (req, res) => {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return res.render('form', {
          data: req.body,
          errors: errors.mapped(),
        })
      }
      const data = matchedData(req)
      const fullName = calcul.fullName(data.lastname,data.firstname);
      const paymentStartDate = data.paymentStartDate;
      const grossIncome = calcul.rounded(calcul.grossIncome(data.annualSalary,12));
      const incomeTax = calcul.rounded(calcul.incomeTax(data.annualSalary));
      const netIncome = calcul.rounded(calcul.netIncome(grossIncome,incomeTax));
      const superAmount = calcul.rounded(calcul.superAmount(grossIncome,data.superRate));
      const formData = {
        fullName,
        paymentStartDate,
        grossIncome,
        incomeTax,
        netIncome,
        superAmount
      }
      res.render("result.ejs", formData);
  }
);


module.exports = router
