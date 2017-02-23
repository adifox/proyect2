/*jshint esversion:6*/
var express = require('express');
var router = express.Router();
var multer = require('multer');
const Picture = require('../models/picture');
var upload = multer({
  dest: './public/uploads/'
});

const User = require('../models/user');

/* GET /profile */
router.get('/', function(req, res, next) {
  User.findOne({
    _id: req.session.currentUser._id
}).populate("artist").exec((err, user)=> {
    if (err) return next(err);
    Picture.find({
      picUserID: req.session.currentUser._id
    }, (err, pictures) => {
      res.render('user/profile', {
        pictures,
        currentUserInfo: user
      });
      console.log(req.session.currentUser);
    });
  });
});

// Route to upload from project base path


router.post('/upload', upload.single('file'), function(req, res) {

  pic = new Picture({
    name: req.body.name,
    pic_path: `uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
    picUserID: req.session.currentUser._id
  });

  pic.save((err) => {
    res.render('user/profile');
  });
  res.redirect('/profile');
});





module.exports = router;
