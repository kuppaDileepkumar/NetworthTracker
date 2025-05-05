const Loan = require('./Loan');
const moment = require('moment');

exports.createLoan = async (req, res) => {
  const { customerId, amount, dueDate } = req.body;
  try {
    const loan = new Loan({
      customerId,
      userId: req.user._id,
      amount,
      balance: amount,
      dueDate
    });
    await loan.save();
    res.status(201).json(loan);
  } catch (err) {
    res.status(400).json({ error: 'Loan creation failed' });
  }
};

exports.getLoans = async (req, res) => {
  const { status } = req.query;
  let query = { userId: req.user._id };
  if (status) query.status = status;

  const loans = await Loan.find(query).populate('customerId', 'name phone');
  res.json(loans);
};

exports.recordRepayment = async (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  try {
    const loan = await Loan.findOne({ _id: id, userId: req.user._id });
    if (!loan) return res.status(404).json({ error: 'Loan not found' });

    loan.repayments.push({ amount });
    loan.balance -= amount;
    if (loan.balance <= 0) {
      loan.balance = 0;
      loan.status = 'paid';
    }
    await loan.save();
    res.json(loan);
  } catch (err) {
    res.status(400).json({ error: 'Repayment failed' });
  }
};

exports.getSummary = async (req, res) => {
  const loans = await Loan.find({ userId: req.user._id });
  let totalLoaned = 0, totalCollected = 0, overdue = 0, repayTimes = [];

  loans.forEach(loan => {
    totalLoaned += loan.amount;
    totalCollected += loan.amount - loan.balance;
    if (loan.status !== 'paid' && moment().isAfter(moment(loan.dueDate))) {
      overdue += loan.balance;
    }

    if (loan.repayments.length > 0) {
      const first = moment(loan.createdAt);
      const last = moment(loan.repayments[loan.repayments.length - 1].date);
      repayTimes.push(last.diff(first, 'days'));
    }
  });

  const avgRepayTime = repayTimes.length > 0
    ? repayTimes.reduce((a, b) => a + b) / repayTimes.length
    : 0;

  res.json({ totalLoaned, totalCollected, overdue, avgRepayTime: avgRepayTime.toFixed(1) });
};

exports.getOverdues = async (req, res) => {
  const loans = await Loan.find({
    userId: req.user._id,
    status: { $ne: 'paid' },
    dueDate: { $lt: new Date() }
  }).populate('customerId', 'name phone');

  loans.forEach(loan => { loan.status = 'overdue'; });
  res.json(loans);
};
