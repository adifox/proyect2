/*jshint esversion:6*/
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const Picture = require('../models/picture');
const profile = require('../models/profile');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptSalt = 10;


router.get('/:id/edit', (req, res, next) => {
  // Iteration #6 (Bonus)
  const id = req.params.id;
  console.log("/:id/edit->" + id);
  User.findOne({
    _id: id
  }, function(err, user) {
    // if (err) return next(err);
    console.log('user->' + user);
    res.render('user/edit-profile', {
      user: user
      //pictures: pictures
    });

  });
});
////////////Condicion para saber si tiene artist activado!!!!//////////////////////////////////////////

router.post('/:id', (req, res, next) => {
  //CONDICION QUE COMPRUEBA SI ES ARTISTA O NO!!!
  //  if (req.body.check !== true) {
  const id = req.params.id;
  console.log("ID -> " + id);
  console.log("artist ---------->" + req.body.check);
  const body = req.body;
  const {
    name,
    email,
    adress
  } = body;
  const criteria = {
    _id: id
  };
  const update = {
    $set: {
      name,
      email,
      adress
    }
  };

  User.updateOne(criteria, update, function(err, user) {
    if (err) return next(err);
    res.redirect('/profile');
  });
});

router.get('/:id/delete', (req, res, next) => {

  const id = req.params.id;
  console.log(id);
  const criteria = {
    _id: id
  };
  User.remove(criteria, function(err) {
    console.log(err);
    if (err) return next(err);
    res.send('<p>Bye Bye</p>');
  });
});

router.get('/show-artist', (req, res, next) => {
  User.find({}, function(err, user) {
    if (err) return next(err);
    res.render('user/show-users', {
      user: user
    });
  });
});

router.get('/:id/details', (req, res, next) => {
  const id = req.params.id;
  User.findOne({
    _id: id
  }, function(err, user) {
    if (err) return next(err);
    Picture.find({
      picUserID: user._id
    }, function(err, pictures) {
      console.log('pictures', pictures);
      console.log('user', user);
      if (err) return next(err);
      res.render('user/details', {
        user: user,
        pictures: pictures
      });
    });
  });
});


module.exports = router;
