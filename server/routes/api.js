const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongooseConfig = require('../config/mongo');
const _ = require('lodash');
const perms = require('../utils/permutations')
const bcrypt = require('bcryptjs');
const request = require("request");
const aws = require('aws-sdk');
const s3 = new aws.S3();

const bcryptSalt = bcrypt.genSaltSync(10);

var BACKEND_URL;

if (process.env.ESCHERNODE_ENV == 'dev') {
  BACKEND_URL = 'http://localhost:8000'
} else if (process.env.ESCHERNODE_ENV == 'prod') {
  BACKEND_URL = 'http://172.30.0.251'
}

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
  // res.sendStatus(200);
  return res.json({message: 'success'})
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
  // save the nn model in database
  mongooseConfig.NNModel.findOne({ name: req.body.name, user: req.user._id }, (err, nnmodel) => {
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


router.post('/experiment', (req, res) => {
  // get experiment with the given id
  mongooseConfig.ExperimentModel.findById(req.body.exp_id, (err, experiment) => {
    if (err) {
      return res.json({
        "message": "didn't find the experiment",
        "experiment": null
      })
    } else {
      if (req.user && experiment.user == req.user._id) {
        return res.json({
          "message": "found the experiment",
          "experiment": experiment
        })
      } else {
        return res.json({
          "message": "found the exp but of a different user",
          "experiment": null
        })
      }
    }
  })
});

router.post('/get_model', (req, res) => {
  // console.log(req.body.model_id)
  mongooseConfig.NNModel.findById(req.body.model_id, (err, model) => {
    if (err) {
      return res.json({
        "message": "didn't find the model",
        "model": null
      })
    } else {
      // console.log(req.user)
      // console.log(model)
      if (req.user && model.user == req.user._id) {
        return res.json({
          "message": "found the model",
          "model": model
        })
      } else {
        return res.json({
          "message": "found the exp but of a different user",
          "model": model
        })
      }
    }
  })
})

/**
   * Tab 1:
   * Experiment Name: exp            Environment Name: env_name
   * Max Episodes: max_episode       Batch Size(v): batch_size
   * 
   * Tab 2:
   * Algorithm Name: algo_name     Discount(v): discount           Learning Rate(v): learning_rate
   * GAE Lambda(v): gae_lambda     Step Size(v): step_size         Scale Reward(v): scale_reward
   * Replay Pool Size(v): replay_pool_size  QF Learning Rate: qf_learning_rate Policy Batch Size(v): policy_batch_size
   * QF Batch Size(v): qf_batch_size       Seed(v): seed
   * 
   * Tab 3:
   * Policy Hidden Sizes: policy_hidden_sizes  Policy Hidden Nonlinearity: policy_hidden_nonlinearity  Policy Output Nonlinearity: policy_output_nonlinearity
   * QF Hidden Sizes: qf_hidden_sizes      QF Hidden Nonlinearity: qf_hidden_nonlinearity
   * Baseline Hidden sizes: baseline_hidden_sizes
   * 
   * Tab 4:
   * No: Parallel Episode Workers: n_parallel    Machine Type: machine_type
   * Experiment Description: exp_desc
   * 
   * Summary:
   */

router.post('/new_rl_exp', (req, res) => {
  var config = {
    form_params: req.body,
    exp: req.body.exp,
    env_name: req.body.env_name,
    max_episode: req.body.max_episode,
    algo_name: req.body.algo_name,
    var_batch_size: req.body.var_batch_size.split(','),
    var_discount: req.body.var_discount.split(','),
    var_learning_rate: req.body.var_learning_rate.split(','),
    var_gae_lambda: req.body.var_gae_lambda.split(','),
    var_step_size: req.body.var_step_size.split(','),
    var_scale_reward: req.body.var_scale_reward.split(','),
    var_replay_pool_size: req.body.var_replay_pool_size.split(','),
    var_qf_learning_rate: req.body.var_qf_learning_rate.split(','),
    var_policy_batch_size: req.body.var_policy_batch_size.split(','),
    var_qf_batch_size: req.body.var_qf_batch_size.split(','),
    var_seed: req.body.var_seed.split(','),
    policy_hidden_sizes: req.body.policy_hidden_sizes,
    policy_hidden_nonlinearity: req.body.policy_hidden_nonlinearity,
    policy_output_nonlinearity: req.body.policy_output_nonlinearity,
    qf_hidden_sizes: req.body.qf_hidden_sizes,
    qf_hidden_nonlinearity: req.body.qf_hidden_nonlinearity,
    baseline_hidden_sizes: req.body.baseline_hidden_sizes,
    n_parallel: req.body.n_parallel,
    machine_type: req.body.machine_type,
  }

  var variant_lists = perms.product(
    config.var_batch_size,
    config.var_discount,
    config.var_learning_rate,
    config.var_gae_lambda,
    config.var_step_size,
    config.var_scale_reward,
    config.var_replay_pool_size,
    config.var_qf_learning_rate,
    config.var_policy_batch_size,
    config.var_qf_batch_size,
    config.var_seed
  )

  var variant_dicts = _.map(variant_lists, x => {
    return {
      batch_size: x[0],
      discount: x[1],
      learning_rate: x[2],
      gae_lambda: x[3],
      step_size: x[4],
      scale_reward: x[5],
      replay_pool_size: x[6],
      qf_learning_rate: x[7],
      policy_batch_size: x[8],
      qf_batch_size: x[9],
      seed: x[10]
    }
  })

  config.variants = variant_dicts

  var newExperiment = new mongooseConfig.ExperimentModel({
    name: req.body.exp,
    description: req.body.exp_desc,
    type: 'rl',
    user: req.user._id,
    env_name: req.body.env_name,
    config: config
  })

  newExperiment.save((err, experiment) => {
    if (err) {
      console.log('error while saving experiment')
      return res.json({
        "exp_started": false,
        "message": "unalbe to save experiment object"
      })
    } else {
      var options = {
        method: 'POST',
        url: BACKEND_URL + '/launch/rl/',
        headers: {
          'content-type': 'application/json'
        },
        body: { exp_id: experiment._id },
        json: true
      };
      request(options, function (error, response, body) {
        if (error) {
          console.log(error)
          return res.json({
            exp_started: false,
            message: "failed to launch experiment from python server",
            exp_id: experiment._id
          })
        } else if (body.status == 200) {
          return res.json({
            exp_started: true,
            message: "starting experiment",
            exp_id: experiment._id
          })
        } else {
          return res.json({
            exp_started: false,
            message: "failed to lauch experiment, python server returend false status code other than 200"
          })
        }
      });
    }
  })
})

router.post('/new_supervised_exp', (req, res) => {
  // New supervised experiment
  var config = {
    form_params: req.body,
    optim: req.body.optim,
    loss: req.body.loss,
    machine_type: req.body.machine_type,
    var_lr: req.body.lr.split(','),
    var_momentum: req.body.momentum.split(','),
    var_test_batch_size: req.body.test_batch_size.split(','),
    var_batch_size: req.body.batch_size.split(','),
    var_seed: req.body.seed.split(','),
    var_epochs: req.body.epochs.split(',')
  }

  var variant_lists = perms.product(
    config.var_lr,
    config.var_momentum,
    config.var_test_batch_size,
    config.var_batch_size,
    config.var_seed,
    config.var_epochs
  )

  var variant_dicts = _.map(variant_lists, x => {
    return {
      lr: x[0],
      momentum: x[1],
      test_batch_size: x[2],
      batch_size: x[3],
      seed: x[4],
      epochs: x[5]
    }
  })

  config.variants = variant_dicts

  // console.log(config)

  var newExperiment = new mongooseConfig.ExperimentModel({
    name: req.body.exp_name,
    description: req.body.exp_desc,
    type: 'supervised',
    model: req.body.model,
    user: req.user._id,
    dataset: req.body.dataset,
    config: config
  })

  // console.log(newExperiment)

  newExperiment.save((err, experiment) => {
    if (err) {
      return res.json({
        "exp_started": false,
        "message": "unable to save experiment object"
      })
    } else {
      
      var options = { method: 'POST',
        url: BACKEND_URL + '/launch/supervised/',
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
            message: "failed to launch experiment from python server",
            exp_id: experiment._id
          })
        } else if (body.status == 200) {
          return res.json({
            exp_started: true,
            message: "starting experiment",
            exp_id: experiment._id
          })
        } else {
          return res.json({
            exp_started: false,
            message: "failed to launch experiment, python server returned false status code other than 200",
            exp_id: experiment._id
          })
        }
      });
    }
  })
})


router.post('/get_experiment_list', (req, res) => {
  mongooseConfig.ExperimentModel.find({
    user: req.user._id
  }).sort({ _id: 1 })
    .limit(100)
    .exec((err, experiments) => {
      if (err) {
        return res.json({
          message: "failed to query for experiments"
        })
      } else {
        return res.json({
          experiments: experiments,
          message: "queried 20 experiments"
        })
      }
    })
})

router.post('/get_nnmodel_list', (req, res) => {
  mongooseConfig.NNModel.find({
    user: req.user._id
  }, {_id: 1, name: 1}).sort({ _id: 1 })
    .exec((err, nnmodels) => {
      if (err) {
        return res.json({
          message: "failed to query for nnmodels"
        })
      } else {
        return res.json({
          nnmodels: nnmodels,
          message: "queried nnmodels successfully"
        })
      }
    })
  // return res.json({
  //   message: "not yet implemented"
  // })
})

router.post('/get_database_list', (req, res) => {
  return res.json({
    message: "not yet implemented"
  })
})

router.post('/s3_object', (req, res) => {
  // console.log(req.body);
  var key = req.body.exp_id + '/' + req.body.variant + '/stats_' + req.body.epoch + '.json'
  // console.log(key)
  var params = { Bucket: 'karaka_test', Key: key }
  s3.getObject(params, function (err, data) {
    if (err) {
      res.json({
        message: "error while querying s3"
      })
    } else {
      var s3_obj = data.Body.toString();
      res.json({
        message: "successfully queried s3",
        gradients: JSON.parse(s3_obj)
      })
    }
  })
  // res.send('get test in posttest works, check console logs');
})
  

module.exports = router;