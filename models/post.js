const mongoose  = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  separable: { type: Boolean, required: true },
  image: { type: String },
  address: { type: String },
  location: { lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  items: [{
    name: { type: String, required: true },
    type: { type: String, required: true },
    perishable: { type: Boolean, required: true },
    image: { type: String },
    claimed: { type: Boolean, required: true, default: false }
  }],
  comments: [commentSchema]
});

postSchema.virtual('imageSRC')
  .get(function getImageSrc() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

module.exports = mongoose.model('Post', postSchema);
