import mongoose from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';

const AutoIncrement = AutoIncrementFactory(mongoose);

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  watchlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Stock'
    }
  ]
}, { timestamps: true });

userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

const User = mongoose.model('User', userSchema);
export default User;