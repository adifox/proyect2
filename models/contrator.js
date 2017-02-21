const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContratorSchema = new Schema({
  name:         String,
  username:     String,
  email:        String,
  password:     String,
  avatar:       String,
  isContrator: { type: Boolean, default: false }
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
