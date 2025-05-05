const express = require('express');
const router = express.Router();
const auth = require('./authMiddleware');
const {
  createLoan,
  getLoans,
  recordRepayment,
  getSummary,
  getOverdues
} = require('.loanController');

router.use(auth);
router.post('/', createLoan);
router.get('/', getLoans);
router.post('/:id/repay', recordRepayment);
router.get('/summary/stats', getSummary);
router.get('/summary/overdue', getOverdues);

module.exports = router;
