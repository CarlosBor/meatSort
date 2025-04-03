const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  apiKey: { type: String, unique: true, default: () => crypto.randomBytes(32).toString('hex') },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.statics.registerUser = async function (email, password) {
  const existingUser = await this.findOne({ email });
  if (existingUser) throw new Error('User already exists');
  const newUser = new this({ email, password });
  await newUser.save();
  return newUser;
};

UserSchema.statics.verifyUser = async function (email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new Error('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error('Invalid credentials');
  return user;
};

module.exports = mongoose.model('User', UserSchema);
