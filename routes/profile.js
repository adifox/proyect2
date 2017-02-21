var express = require('express');
var router = express.Router();

/* GET /profile */
router.get('/', function(req, res, next) {
  res.render('auth/profile',{currentUserInfo: req.session.currentUser});
});

/* GET /profile/edit */
router.get("/edit", (req, res, next) => {
    res.send("It works!");
});

module.exports = router;
