import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add a text value'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price value'],
  },
  date: {
    type: Date,
    required: [true, 'Please add a date value'],
  },
}, { timestamps: true });

const Transaction = model('Transaction', transactionSchema);
export default Transaction;
