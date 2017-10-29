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
})

var NNModelSchema = mongoose.Schema({
  user: String,
  name: String,
  network: String,
  description: String
})

var DatasetSchema = mongoose.Schema({
  user: String,
  name: String,
  s3: String,
  description: String
})

var ExperimentSchema = mongoose.Schema({
  name: String,
  type: String,
  user: String,
  model: String,
  dataset: String,
  config: {}
})


exports.UserModel = mongoose.model('Users', UserSchema);
exports.NNModel = mongoose.model('nnmodel', NNModelSchema);
exports.DatasetModel = mongoose.model('dataset', DatasetSchema)
exports.ExperimentModel = mongoose.model('experiment', ExperimentSchema)