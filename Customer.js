const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  trustScore: {
    type: Number,
    min: [1, 'Minimum trust score is 1'],
    max: [10, 'Maximum trust score is 10'],
    required: true,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
