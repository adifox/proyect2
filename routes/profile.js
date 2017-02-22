var express = require('express');
var router = express.Router();
var multer  = require('multer');
const Picture = require('../models/picture');

/* GET /profile */
// router.get('/', function(req, res, next) {
//   res.render('auth/profile',{currentUserInfo: req.session.currentUser});
// });

router.get('/', function(req, res, next) {
  Picture.find({picUserID: req.session.currentUser._id},(err, pictures) => {
    res.render('auth/profile', {pictures, currentUserInfo: req.session.currentUser});
    console.log(req.session.currentUser);
});
});

/* GET /profile/edit */
router.get("/edit", (req, res, next) => {
    res.send("It works!");
});


// Route to upload from project base path
var upload = multer({ dest: './public/uploads/' });

router.post('/upload', upload.single('file'), function(req, res){

  pic = new Picture({
    name: req.body.name,
    pic_path: `uploads/${req.file.filename}`,
    pic_name: req.file.originalname,
    picUserID: req.session.currentUser._id
  });

  pic.save((err) => {
      res.render('auth/profile');
  });
  res.redirect('/profile');
});


module.exports = router;
