/*jshint esversion:6*/
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
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
////////////LLEGA HASTA AQUI!!!!//////////////////////////////////////////

router.post('/:id', (req, res, next) => {

  const id = req.params.id;
  console.log("ID -> " + id);
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

router.get('/showusers', (req, res, next) => {
    res.render('user/show-users', {currentUserInfo: req.session.currentUser});
});


module.exports = router;
