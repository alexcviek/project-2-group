const mongoose = require('mongoose');
const s3 = require('../lib/s3');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const foodBankSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  location: { lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  type: { type: String, required: true },
  url: { type: String },
  image: { type: String },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  comments: [commentSchema]
});

foodBankSchema.virtual('imageSRC')
  .get(function getImageSrc() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });
foodBankSchema.pre('remove', function removeImage(next) {
  if(this.image) return s3.deleteObject({ Key: this.image }, next);
  next();
});

module.exports = mongoose.model('FoodBank', foodBankSchema);
