const express = require('express')
const router = express.Router()
const { getOverdueLoans } = require('./overdueController')

router.get('/overdue', getOverdueLoans)

module.exports = router
