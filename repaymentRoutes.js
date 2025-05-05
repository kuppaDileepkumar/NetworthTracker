const express = require('express')
const router = express.Router()
const { createRepayment } = require('./repaymentController')

router.post('/', createRepayment)

module.exports = router
