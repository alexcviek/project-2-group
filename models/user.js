const mongoose  = require('mongoose');
// const bcrypt = require('bcrypt');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  facebookId: { type: Number },
  image: { type: String },
  comments: [commentSchema]
});

module.exports = mongoose.model('User', userSchema);
