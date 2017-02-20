/*jshint esversion:6*/
const express = require('express');
const bcrypt = require('bcrypt');

const Artist = require('../models/artist');
const User = require('../models/user');

const router = express.Router();

const bcryptSalt = 10;
//Emepezamos el signup de los artistas

//Crear condicion DE SI HACE LOGIN COMO ARTISTA O USUARIO
var userType = "artist"

if (userType === "artist") {

  router.get('/signup', (req, res, next) => {
    res.render('auth/signup', {
      errorMessage: ''
    });
  });
  router.post('/signup', (req, res, next) => {
    const nameInput = req.body.name;
    const emailInput = req.body.email;
    const passwordInput = req.body.password;
    const containName = req.body.containName;
    console.log(containName);

    if (emailInput === '' || passwordInput === '') {
      res.render('auth/signup', {
        errorMessage: 'Enter both email and password to sign up.'
      });
      return;
    }
    Artist.findOne({
      email: emailInput
    }, '_id', (err, existingUser) => {
      if (err) {
        next(err);
        return;
      }

      if (existingUser !== null) {
        res.render('auth/signup', {
          errorMessage: `The email ${emailInput} is already in use.`
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashedPass = bcrypt.hashSync(passwordInput, salt);

      const artistSubmission = {
        name: nameInput,
        email: emailInput,
        password: hashedPass
      };
      //theArtist
      const theArtist = new Artist(artistSubmission);

      theArtist.save((err) => {
        if (err) {
          res.render('auth/signup', {
            errorMessage: 'Something went wrong. Try again later.'
          });
          return;
        }
        res.redirect('/');
      });
    });
  });
  router.get('/login', (req, res, next) => {
    res.render('auth/login', {
      errorMessage: ''
    });
  });
  router.post('/login', (req, res, next) => {
    const emailInput = req.body.email;
    const passwordInput = req.body.password;



    if (emailInput === '' || passwordInput === '') {
      res.render('auth/login', {
        errorMessage: 'Enter both email and password to log in.'
      });
      return;
    }
    Artist.findOne({
      email: emailInput
    }, (err, theArtist) => {
      if (err || theArtist === null) {
        res.render('auth/login', {
          errorMessage: `There isn't an account with email ${emailInput}.`
        });
        return;
      }

      if (!bcrypt.compareSync(passwordInput, theArtist.password)) {
        res.render('auth/login', {
          errorMessage: 'Invalid password.'
        });
        return;
      }

      req.session.currentUser = theArtist;
      res.redirect('/');
    });
  });
  router.get('/logout', (req, res, next) => {
    if (!req.session.currentUser) {
      res.redirect('/');
      return;
    }
    req.session.destroy((err) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect('/');
    });
  });

} else {
  ////////////////////////////////////////////////////////////////////////////////////////////////
  //para registrar User
  router.get('/signup', (req, res, next) => {
    res.render('auth/signup', {
      errorMessage: ''
    });
  });
  router.post('/signup', (req, res, next) => {
    const nameInput = req.body.name;
    const emailInput = req.body.email;
    const passwordInput = req.body.password;


    if (emailInput === '' || passwordInput === '') {
      res.render('auth/signup', {
        errorMessage: 'Enter both email and password to sign up.'
      });
      return;
    }

    User.findOne({
      email: emailInput
    }, '_id', (err, existingUser) => {
      if (err) {
        next(err);
        return;
      }

      if (existingUser !== null) {
        res.render('auth/signup', {
          errorMessage: `The email ${emailInput} is already in use.`
        });
        return;
      }

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashedPass = bcrypt.hashSync(passwordInput, salt);

      const userSubmission = {
        name: nameInput,
        email: emailInput,
        password: hashedPass

      };

      const theUser = new User(userSubmission);

      theUser.save((err) => {
        if (err) {
          res.render('auth/signup', {
            errorMessage: 'Something went wrong. Try again later.'
          });
          return;
        }
        res.redirect('/');
      });
    });
  });

  router.get('/login', (req, res, next) => {
    res.render('auth/login', {
      errorMessage: ''
    });
  });

  router.post('/login', (req, res, next) => {
    const emailInput = req.body.email;
    const passwordInput = req.body.password;
    const collectionName = "user";

    if (emailInput === '' || passwordInput === '') {
      res.render('auth/login', {
        errorMessage: 'Enter both email and password to log in.'
      });
      return;
    }

    User.findOne({
      email: emailInput
    }, (err, theUser) => {
      if (err || theUser === null) {
        res.render('auth/login', {
          errorMessage: `There isn't an account with email ${emailInput}.`
        });
        return;
      }

      if (!bcrypt.compareSync(passwordInput, theUser.password)) {
        res.render('auth/login', {
          errorMessage: 'Invalid password.'
        });
        return;
      }

      req.session.currentUser = theUser;
      res.redirect('/');
    });
  });

  router.get('/logout', (req, res, next) => {
    if (!req.session.currentUser) {
      res.redirect('/');
      return;
    }

    req.session.destroy((err) => {
      if (err) {
        next(err);
        return;
      }

      res.redirect('/');
    });
  });







}
module.exports = router;
