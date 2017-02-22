/*jshint esversion:6*/
var express = require('express');
var router = express.Router();


const User = require('../models/user');

/* GET /profile */
router.get('/', function(req, res, next) {
  console.log(req.session.currentUser);
  User.find({
    _id: req.session.currentUser._id
  }, function(err, user) {
    if (err) return next(err);
    res.render('user/profile', {
      currentUserInfo: user[0]
    });
  });
});

router.get("/edit", (req, res, next) => {
  res.send("It works!");
});





module.exports = router;
