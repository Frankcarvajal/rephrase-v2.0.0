const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: {type: String, unique: true, required: true},
  accessToken: {type: String, required: true},
  displayName: {type: String},
  defaultLanguage: {type: String, required: true}
});

userSchema.methods.apiRepr = function() {
  return {
    id: this._id,
    googleId: this.googleId,
    displayName: this.displayName,
    defaultLanguage: this.defaultLanguage
  };
}

const User = mongoose.model('User', userSchema);

module.exports = { User };