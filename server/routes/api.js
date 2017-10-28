const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongooseConfig = require('../config/mongo.js');
const bcrypt = require('bcryptjs');

const bcryptSalt = bcrypt.genSaltSync(10);



// basic test route
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/gettest', (req, res) => {
  console.log(req.body);
  res.send('get test works, check console logs');
})

router.get('/posttest', (req, res) => {
  console.log(req.body);
  res.send('get test in posttest works, check console logs');
})

router.post('/posttest', (req, res) => {
  console.log(req.body);
  res.sendStatus(200);
})


passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {

    mongooseConfig.UserModel.findOne({ username: username }, function (err, user) {
      if (user) {
        if (bcrypt.compareSync(password, user.password)) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'wrong password' });
        }
      }
      return done(null, false, { message: 'user name not found' });

    })
  }))

passport.serializeUser(function (user, done) {
  done(null, user);
})

passport.deserializeUser(function (user, done) {
  done(null, user);
})


// logs a user in
router.post('/login', passport.authenticate('local'), (req, res) => {
  // console.log(req.body)
  // console.log('api login')
  // console.log(req.user)
  // console.log('@@@@@@@@@@@@@@@@@')
  res.json(req.user)
})


// returns user if logged in and '0' otherwise
router.get('/loggedin', (req, res) => {
  // console.log(req.body)
  // console.log(req.isAuthenticated())
  res.send(req.isAuthenticated() ? req.user : '0');
})


// logs out user
router.post('/logout', (req, res) => {
  req.logOut();
  res.sendStatus(200);
})


// registers a new user
router.post('/register', (req, res) => {
  // console.log(req.body);
  mongooseConfig.UserModel.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      res.json(null);
      return;
    } else {
      var newUser = new mongooseConfig.UserModel(req.body);

      // synchronously hash password and store it in db
      newUser.password = bcrypt.hashSync(newUser.password, bcryptSalt);
      newUser.roles = [];
      newUser.save((err, user) => {
        req.login(user, (err) => {
          if (err) {
            return next(err);
          } else {
            // console.log('register api call')
            // console.log(user)
            // console.log('@@@@@@@@@')
            return res.json(user)
          }
        })
      })
    }
  })
})

router.post('/updateAccount', (req, res) => {
  mongooseConfig.UserModel.findOne({ username: req.body.username }, (err, user) => {
    if (user) {
      console.log("user exists, updating user according to submission");
      
    }
  })
})

module.exports = router;