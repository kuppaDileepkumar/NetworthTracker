const express = require('express')
const router = express.Router()
const { createRepayment } = require('../controllers/repaymentController')

router.post('/', createRepayment)

module.exports = router
