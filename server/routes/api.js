const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongooseConfig = require('../config/mongo.js');
const bcrypt = require('bcryptjs');
const request = require("request");

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

router.post('/supervised', (req, res) => {
  var newExperiment = new mongooseConfig.ExperimentModel({
    name: req.body.exp_name,
    description: req.body.exp_desc,
    type: 'supervised',
    model: req.body.model,
    user: req.user._id,
    dataset: req.body.dataset,
    config: {
      optim: req.body.optim,
      loss: req.body.loss,
      lr: req.body.lr,
      momentum: req.body.momentum,
      test_batch_size: req.body.test_batch_size,
      batch_size: req.body.batch_size,
      seed: req.body.seed,
      epochs: req.body.epochs
    }
  })

  newExperiment.save((err, experiment) => {
    if (err) {
      return res.json({
        "exp_started": false,
        "message": "unable to save experiment object"
      })
    } else {
      
      var options = { method: 'POST',
        url: 'http://localhost:8000/supervised/launch/',
        headers: 
        { 
          'content-type': 'application/json'
        },
        body: { exp_id: experiment._id },
        json: true
      };
      
      request(options, function (error, response, body) {
        if (error) {
          return res.json({
            exp_started: false,
            message: "failed to launch experiment"
          })
        } else if (body.status == 200) {
          return res.json({
            exp_started: true,
            message: "starting experiment"
          })
        } else {
          return res.json({
            exp_started: false,
            message: "failed to launch experiment, python server returned false"
          })
        }
      
      });
      
    }
  })
})

module.exports = router;