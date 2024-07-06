import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true,
    unique: true
  },
  symbol: {
    type: String,
    required: true,
    unique: true
  },
  currentPrice: {
    type: Number,
    required: true
  },
  previousPrice: {
    type: Number,
    required: true
  },
  changeAmount: {
    type: Number,
    required: true
  },
  changePercentage: {
    type: Number,
    required: true
  },
}, { timestamps: true });

const Stock = mongoose.model('Stock', stockSchema);
export default Stock;