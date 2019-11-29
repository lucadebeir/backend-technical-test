
const express = require('express')
const router = express.Router()
const calcul = require('./calcul')

const { check, validationResult } = require('express-validator/check')

const { matchedData } = require('express-validator/filter')
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/form/result', (req, res) => {
  log('Data: ', req);
  res.render("result.ejs", req);
});

router.get('/form', (req, res) => {
  res.render('form', {
    data: {},
    errors: {},
    csrfToken: req.csrfToken()
  })
})

router.post('/form', [
  check('firstname')
    .isLength({ min: 1 })
    .withMessage('Firstname is required')
    .trim(),
  check('lastname')
    .isLength({ min: 1 })
    .withMessage('Lastname is required')
    .trim(),
  check('annualSalary')
    .isLength({ min: 0 })
    .withMessage('AnnualSalary is required')
    .trim(),
  check('superRate')
    .isIn(["0","1","2","3","4","5","6","7","8","9","10","11","12"])
    .withMessage('SuperRate is a percent, enter a value between 0 and 12')
    .trim(),
  check('paymentStartDate')
    .withMessage('PaymentStartDate is required')
    .trim()
  ], (req, res) => {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        return res.render('form', {
          data: req.body,
          errors: errors.mapped(),
          csrfToken: req.csrfToken()
        })
      }
      const data = matchedData(req)
      const name = calcul.name(data.lastname,data.firstname);
      const paymentStartDate = data.paymentStartDate;
      const grossIncome = calcul.rounded(calcul.grossIncome(data.annualSalary,12));
      const incomeTax = calcul.rounded(calcul.incomeTax(data.annualSalary));
      const netIncome = calcul.rounded(calcul.netIncome(grossIncome,incomeTax));
      const superAmount = calcul.rounded(calcul.superAmount(grossIncome,data.superRate));
      const formData = {
        name,
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
