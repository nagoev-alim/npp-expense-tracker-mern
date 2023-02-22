import asyncHandler from 'express-async-handler';

import Transaction from '../models/TransactionModel.js';

export const transactionsController = {
  /**
   * @desc    Get transactions
   * @route   GET /api/transactions
   * @access  private
   */
  get: asyncHandler(async (req, res) => {
    const { id: user } = req.user;

    const transactions = await Transaction.find({ user });

    res.status(200).json(transactions);
  }),
  /**
   * @desc    Create transaction
   * @route   POST /api/transactions
   * @access  public
   */
  create: asyncHandler(async (req, res) => {
    const { title, price, date } = req.body;
    const { id: user } = req.user;

    if (!title || !price || !date) {
      res.status(400);
      throw new Error('Please fill all fields');
    }

    const transaction = await Transaction.create({ title, price, date, user });

    res.status(200).json(transaction);
  }),
  /**
   * @desc    Update transaction
   * @route   PUT /api/transactions/:id
   * @access  public
   */
  update: asyncHandler(async (req, res) => {
    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    const { id } = req.params;
    const { id: user } = req.user;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      res.status(400);
      throw new Error('Transaction not found');
    }

    // Make sure the logged-in user matches the transaction user
    if (transaction.user.toString() !== user) {
      res.status(401);
      throw new Error('User not authorized');
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(id, req.body, { new: true });

    res.status(200).json(updatedTransaction);
  }),
  /**
   * @desc    Delete transaction
   * @route   DELETE /api/transactions/:id
   * @access  public
   */
  delete: asyncHandler(async (req, res) => {
    // Check for user
    if (!req.user) {
      res.status(401);
      throw new Error('User not found');
    }

    const { id } = req.params;
    const { id: user } = req.user;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
      res.status(400);
      throw new Error('Transaction not found');
    }

    // Make sure the logged-in user matches the transaction user
    if (transaction.user.toString() !== user) {
      res.status(401);
      throw new Error('User not authorized');
    }

    await transaction.remove();

    res.status(200).json({ id: req.params.id });
  }),
};
