const mongoose = require('mongoose');
const crypto = require('crypto');

const JobSchema = new mongoose.Schema({
  type: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in_progress', 'complete'], default: 'pending' },
  payload: { type: mongoose.Schema.Types.Mixed},
  result: { type: mongoose.Schema.Types.Mixed, default: null },
  artisan: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

JobSchema.statics.registerJob = async function (type, payload) {
  const newJob = new this({ type, payload });
  await newJob.save();
  return newJob;
};

module.exports = mongoose.model('Job', JobSchema);