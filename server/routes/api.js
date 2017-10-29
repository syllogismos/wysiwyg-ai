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
    usernameField: 'email',
    passwordField: 'password'
  },
  function (email, password, done) {

    mongooseConfig.UserModel.findOne({ email: email }, function (err, user) {
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
  console.log(req.user)
  console.log('@@@@@@@@@@@@@@@@@')
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
  mongooseConfig.UserModel.findOne({ email: req.body.email }, (err, user) => {
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
  mongooseConfig.UserModel.findById(req.user._id, (err, user) => {
    if (user) {
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.company = req.body.company;
      user.position = req.body.position;
      user.save((err, user) => {
        req.login(user, (err) => {
          if (err) {
            return next(err);
          } else {
            return res.json(user)
          }
        })
      })
    }
  })
})

router.post('/updateEmail', (req, res) => {
  mongooseConfig.UserModel.findById(req.user._id, (err, user) => {
    if (user) {
      user.email = req.body.accountEmail;
      user.save((err, user) => {
        req.login(user, (err) => {
          if (err) {
            return next(err);
          } else {
            return res.json(user)
          }
        })
      })
    }
  })
})

router.post('/savennmodel', (req, res) => {
  mongooseConfig.NNModel.findOne({ name: req.body.name }, (err, nnmodel) => {
    if (nnmodel) {
      return res.json({
        "saved": false,
        "message": "Model with current Name exists"
      })
    } else {
      var name = req.body.name
      var network = req.body.network
      var user = req.user._id
      var newNNModel = new mongooseConfig.NNModel({
        user: user,
        network: network,
        name: name
      })
      newNNModel.save((err, nnmodel) => {
        if (err) {
          return res.json({
            "saved": false,
            "message": "Unable to save"
          })
        } else {
          return res.json({
            "saved": false,
            "message": "Saved the model"
          })
        }
      })
    }
  })

})

module.exports = router;