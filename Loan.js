const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  amount: { type: Number, required: true },
  balance: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  repayments: [
    {
      amount: Number,
      date: { type: Date, default: Date.now }
    }
  ],
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' }
});

module.exports = mongoose.model('Loan', loanSchema);
