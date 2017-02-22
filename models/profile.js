/*jshint esversion:6*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileSchema = new Schema({

  mobility: Boolean,
  profileAvatar: String,
  youtube: String,
  tel: String

});

profileSchema.set('timestamps', true);

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
