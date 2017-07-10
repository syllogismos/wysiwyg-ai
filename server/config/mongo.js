const mongoose = require('mongoose');

var exports = module.exports = {}

var db = mongoose.connect('mongodb://localhost/first')

var UserSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  firstName: String,
  lastName: String,
  roles: [String]
})

// var admin = new mongooseConfig.UserModel({
//     username: 'anil',
//     password: 'anil',
//     email: 'anilkaraka@gmail.com',
//     firstName: 'anil',
//     lastName: 'karaka',
//     roles: ['admin']
// })

// var student = new mongooseConfig.UserModel({
//     username: 'tanu',
//     password: 'tanu',
//     email: 'tanunori@gmail.com',
//     firstName: 'tanu',
//     lastName: 'nori',
//     roles: ['student']
// })

// admin.save()
// student.save()

exports.UserModel = mongoose.model('UserModel', UserSchema);