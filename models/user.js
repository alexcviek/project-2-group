const mongoose  = require('mongoose');
const bcrypt = require('bcrypt');
const s3 = require('../lib/s3');
const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true },
  password: { type: String },
  image: { type: String },
  facebookId: { type: Number },
  githubId: { type: Number },
  comments: [commentSchema]
});

userSchema
.virtual('passwordConfirmation')
.set(function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
});

userSchema
.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'createdBy'
});

userSchema.pre('remove', function removeImage(next){
  if(this.image) return s3.deleteObject({ Key: this.image }, next);
  next();
});

userSchema
  .path('image')
  .set(function getPreviousImage(image){
    this._image = this.image;
    return image;
  });

userSchema
  .pre('save', function checkPreviousImage(next){
    if(this.isModified('image') && this._image) {
      return s3.deleteObject({ Key: this._image}, next);
    }
    next();
  });

userSchema.virtual('imageSRC')
  .get(function getImageSrc() {
    if(!this.image) return null;
    if(this.image.match(/^http/)) return this.image;
    return `https://s3-eu-west-1.amazonaws.com/${process.env.AWS_BUCKET_NAME}/${this.image}`;
  });

userSchema.pre('validate', function checkPassword(next) {
  if(!this.password && !this.githubId && !this.facebookId) {
    this.invalidate('password', 'required');
  }
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
