/*jshint esversion:6*/
var express = require('express');
var router = express.Router();


const User = require('../models/user');

/* GET /profile */
router.get('/', function(req, res, next) {
  console.log(req.session.currentUser);
  res.render('user/profile', {
    currentUserInfo: req.session.currentUser
  });
});

router.get("/edit", (req, res, next) => {
  res.send("It works!");
});





module.exports = router;
