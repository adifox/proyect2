/*jshint esversion:6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  adress: String,
  artist: {type: Schema.Types.ObjectId,ref: 'Profile' }
});

userSchema.set('timestamps', true);

const User = mongoose.model('User', userSchema);

module.exports = User;
