/*jshint esversion:6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  talent: String,
  summary: String,
  interests: String,
  youtube: String

});

profileSchema.set('timestamps', true);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
