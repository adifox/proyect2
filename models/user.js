const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const UserSchema = mongoose.Schema({
  name:         String,
  username:     String,
  email:        String,
  password:     String,
  talent:       String,
  instrument:   String
});

UserSchema.set('timestamps', true);
const User = mongoose.model('User', UserSchema);

module.exports = User;

////
