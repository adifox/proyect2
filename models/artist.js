/*jshint esversion:6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistShema = new Schema({
  name: String,
  email: String,
  password: String,
  type: String
});

artistShema.set('timestamps', true);

const Artist = mongoose.model('Artist', artistShema);

module.exports = Artist;
