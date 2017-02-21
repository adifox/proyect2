/*jshint esversion:6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  name: String,
  email: String,
  password: String,
  adress: String,
  mobility: Boolean,
  profileAvatar: String,
  youtube: String,
  tel: String,
  art: Boolean

});

artistSchema.set('timestamps', true);

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;
