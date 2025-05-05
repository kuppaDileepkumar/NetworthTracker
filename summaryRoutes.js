// routes/summaryRoutes.js
const express = require('express')
const { getSummary } = require('./summaryController')

const router = express.Router()

router.get('/', getSummary)

module.exports = router
