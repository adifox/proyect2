/*jshint esversion:6*/
const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const router = express.Router();
const mongoose = require('mongoose');
const bcryptSalt = 10;


router.get('/user/:id/edit', (req, res, next) => {
  // Iteration #6 (Bonus)
  const id = req.params.id;
  console.log(id);
  User.findOne({
    _id: id
  }, function(err, user) {
    // if (err) return next(err);
    console.log(err);
    console.log(user);

    res.render('user/edit-profile', {
      user: user
    });
  });
});


router.post('/user/:id', (req, res, next) => {
  // Iteration #6 (Bonus)
  const id = req.params.id;
  const body = req.body;
  const {
    name,
    email,
    password,
    company,
    adress,
    icon
  } = body;


  const criteria = {
    _id: id
  };
  const update = {
    $set: {
      name,
      email,
      password,
      company,
      adress,
      icon
    }
  };

  User.updateOne(criteria, update, function(err, user) {
    if (err) return next(err);
    User.find({}, function(err, user) {
      if (err) return next(err);
      res.render('index.ejs', {
        user
      });
    });
  });
});

module.exports = router;
