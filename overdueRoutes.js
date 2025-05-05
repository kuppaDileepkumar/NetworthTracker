const express = require('express')
const router = express.Router()
const { getOverdueLoans } = require('../controllers/overdueController')

router.get('/overdue', getOverdueLoans)

module.exports = router
