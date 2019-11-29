
const express = require('express')
const router = express.Router()

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
    .isLength({ min: 1 })
    .withMessage('AnnualSalary is required')
    .trim(),
  check('superRate')
      .isLength({ min: 1 })
    .withMessage('SuperRate is required')
    .trim(),
    check('paymentStartDate')
    .isLength({ min: 1 })
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
      console.log('Data: ', data);
      res.render("result.ejs", data);
  }
);


module.exports = router
