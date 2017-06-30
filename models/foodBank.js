const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const foodBankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  type: { type: String, required: true },
  url: { type: String },
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
});

module.exports = mongoose.model('FoodBank', foodBankSchema);
