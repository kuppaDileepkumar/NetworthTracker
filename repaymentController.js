// controllers/repaymentController.js
const Repayment = require('./Repayment');
const Loan = require('./Loan');

exports.createRepayment = async (req, res) => {
  try {
    const { loanId, amount, date } = req.body;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }

    // Create repayment
    const repayment = new Repayment({
      loanId,
      amount,
      date,
    });
    await repayment.save();

    // Update loan amount
    loan.amount -= amount;
    if (loan.amount <= 0) {
      loan.status = 'repaid';
      loan.amount = 0;
    }
    await loan.save();

    res.status(201).json({ message: 'Repayment recorded successfully', repayment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
