const Loan = require('../models/Loan') // ensure path is correct

const getSummary = async (req, res) => {
  // ✅ Defensive check
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: 'User not authenticated' })
  }

  const userId = req.user.id

  try {
    const loans = await Loan.find({ user: userId })

    const totalLoaned = loans.reduce((sum, loan) => sum + loan.amount, 0)
    const totalCollected = loans.reduce((sum, loan) => sum + loan.repaidAmount, 0)
    const overdueAmount = loans
      .filter(loan => loan.status === 'overdue')
      .reduce((sum, loan) => sum + (loan.amount - loan.repaidAmount), 0)

    res.status(200).json({
      totalLoaned,
      totalCollected,
      overdueAmount
    })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

module.exports = { getSummary }
