import { Schema, model } from 'mongoose';

const budgetSchema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Budget = model('Budget', budgetSchema);

export default Budget;