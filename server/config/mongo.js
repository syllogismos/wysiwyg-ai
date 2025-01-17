const mongoose = require('mongoose');

var exports = module.exports = {}

var db;

if (process.env.ESCHERNODE_ENV == 'dev') {
  db = mongoose.connect('mongodb://52.2.113.244/eschernode')  
} else if (process.env.ESCHERNODE_ENV == 'prod') {
  db = mongoose.connect('mongodb://172.30.0.169/eschernode')
}

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  email: { type: String, unique: true },
  firstName: String,
  lastName: String,
  company: String,
  position: String,
  githubid: String,
  githubProfile: {},
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
  env_name: String,
  config: {}
}, { timestamps: true })

var PayPalPaymentSchema = mongoose.Schema({
  user: String,
  amount: String,
  payment_info: String
}, { timestamps: true })


exports.UserModel = mongoose.model('user', UserSchema);
exports.NNModel = mongoose.model('nnmodel', NNModelSchema);
exports.DatasetModel = mongoose.model('dataset', DatasetSchema)
exports.ExperimentModel = mongoose.model('experiment', ExperimentSchema)
exports.PayPalPaymentModel = mongoose.model('paypalpayment', PayPalPaymentSchema)
exports.mongoose = mongoose