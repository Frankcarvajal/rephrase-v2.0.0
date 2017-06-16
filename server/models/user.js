const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {type: String, unique: true, required: true},
  accessToken: {type: String, required: true},
  displayName: {type: String},
  nickName: {type: String}
});

userSchema.methods.apiRepr = function() {
  return {
    googleId: this.googleId,
    displayName: this.displayName
  };
}

const User = mongoose.model('User', userSchema);

module.exports = { User };