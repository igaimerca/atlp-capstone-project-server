import mongoose from 'mongoose';

import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken;

const userSchema = mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Email is invalid'],
  },
  position: String,
  experience: String,
  company: String,
  password: {
    type: String,
    select: false,
  },
  role: {
    type: String,
    enum: ['admin', 'standard'],
    default: 'admin',
  },
});

userSchema.methods.generateAuthToken = function () {
  const token = sign(
    { _id: this._id, role: this.role },
    process.env.JWT.trim()
  );
  return 'Bearer ' + token;
};

export default mongoose.model('User', userSchema);
