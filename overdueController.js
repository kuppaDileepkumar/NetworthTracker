const Loan = require('./Loan') // Make sure this path is correct

// @desc   Get all overdue loans for the authenticated user
// @route  GET /api/overdue
// @access Private
const getOverdueLoans = async (req, res) => {
  try {
    // Ensure user is authenticated and attached to request
    const userId = req.user?.id
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized: user not authenticated' })
    }

    // Find loans with status 'overdue' for the user
    const overdueLoans = await Loan.find({
      user: userId,
      status: 'overdue'
    })

    res.status(200).json({ overdueLoans })
  } catch (error) {
    console.error('Error fetching overdue loans:', error)
    res.status(500).json({ error: 'Server error while fetching overdue loans' })
  }
}

module.exports = { getOverdueLoans }
