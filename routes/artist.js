/*jshint esversion:6*/
const express = require('express');
const bcrypt = require('bcrypt');

const Artist = require('../models/artist');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptSalt = 10;

router.get('/artist/:id/edit', (req, res, next) => {
  // Iteration #6 (Bonus)
  const id = req.params.id;
  console.log(id);
  Artist.findOne({
    _id: id
  }, function(err, artist) {
    // if (err) return next(err);
    console.log(err);
    console.log(artist);

    res.render('artist/edit-profile', {
      artist: artist
    });
  });
});

router.post('/artist/:id', (req, res, next) => {
  // Iteration #6 (Bonus)
  const id = req.params.id;
  const body = req.body;
  const {
    name,
    email,
    adress,
    mobility,
    profileAvatar,
    youtube
  } = body;

  const criteria = {
    _id: id
  };
  const update = {
    $set: {
      name,
      email,
      adress,
      mobility,
      profileAvatar,
      youtube
    }
  };

  Artist.updateOne(criteria, update, function(err, artist) {
    if (err) return next(err);
    Artist.find({}, function(err, artist) {
      if (err) return next(err);
      res.render('show-artists.ejs', {
        artist
      });
    });
  });
});

module.exports = router;



/*
router.get('/artist/:id/edit', (req, res, next) => {
  const artist = req.body.id;

  Artist.findById(artist, (err, artist) => {
    if (err) {
      return next(err);
    }
    res.render('profile/edit-profile', {
      artist: artist
    });

  });
  */
