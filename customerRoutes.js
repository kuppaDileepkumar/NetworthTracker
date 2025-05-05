const express = require('express');
const router = express.Router();
const auth = require('./authMiddleware');
const {
  createCustomer,
  getCustomers,
  updateCustomer,
  deleteCustomer
} = require('./customerController');

router.use(auth);
router.post('/', createCustomer);
router.get('/', getCustomers);
router.put('/:id', updateCustomer);
router.delete('/:id', deleteCustomer);

module.exports = router;
