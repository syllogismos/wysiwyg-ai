const mongoose = require('mongoose');

var exports = module.exports = {}

var db = mongoose.connect('mongodb://localhost/eschernode')

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  company: String,
  position: String,
  roles: [String]
}, {timestamps: true})

var NNModelSchema = mongoose.Schema({
  user: String,
  name: String,
  network: String,
  description: String
}, {timestamps: true})

var DatasetSchema = mongoose.Schema({
  user: String,
  name: String,
  s3: String,
  description: String
}, {timestamps: true})

var ExperimentSchema = mongoose.Schema({
  name: String,
  type: String,
  user: String,
  model: String,
  dataset: String,
  description: String,
  config: {}
}, {timestamps: true})


exports.UserModel = mongoose.model('Users', UserSchema);
exports.NNModel = mongoose.model('nnmodel', NNModelSchema);
exports.DatasetModel = mongoose.model('dataset', DatasetSchema)
exports.ExperimentModel = mongoose.model('experiment', ExperimentSchema)