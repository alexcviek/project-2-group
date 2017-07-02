const mongoose  = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  separable: { type: Boolean, required: true },
  image: { type: String },
  location: { lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  items: [{
    name: { type: String, required: true },
    type: { type: String, required: true },
    perishable: { type: Boolean, required: true },
    image: { type: String, required: true },
    claimed: { type: Boolean, required: true }
  }],
  comments: [commentSchema]
});

module.exports = mongoose.model('Post', postSchema);
