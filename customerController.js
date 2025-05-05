const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
  const { name, phone, trustScore } = req.body;
  try {
    const customer = new Customer({ name, phone, trustScore, userId: req.user._id });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create customer' });
  }
};

exports.getCustomers = async (req, res) => {
  const customers = await Customer.find({ userId: req.user._id });
  res.json(customers);
};

exports.updateCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: 'Update failed' });
  }
};

exports.deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Customer.findOneAndDelete({ _id: id, userId: req.user._id });
    if (!result) return res.status(404).json({ error: 'Customer not found' });
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Delete failed' });
  }
};

// CREATE
exports.createCustomer = async (req, res) => {
  const { name, phone, trustScore } = req.body;
  try {
    const customer = new Customer({
      name,
      phone,
      trustScore,
      userId: req.user.id,
    });
    await customer.save();
    res.status(201).json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// READ ALL (for logged-in user only)
exports.getCustomers = async (req, res) => {
  const customers = await Customer.find({ userId: req.user.id });
  res.json(customers);
};

// READ ONE
exports.getCustomer = async (req, res) => {
  const customer = await Customer.findOne({ _id: req.params.id, userId: req.user.id });
  if (!customer) return res.status(404).json({ error: 'Customer not found' });
  res.json(customer);
};

// UPDATE
exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    res.json(customer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE
exports.deleteCustomer = async (req, res) => {
  const customer = await Customer.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
  if (!customer) return res.status(404).json({ error: 'Customer not found' });
  res.json({ message: 'Customer deleted' });
};
