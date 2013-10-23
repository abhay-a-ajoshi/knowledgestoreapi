
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , User = mongoose.model('User')
  , utils = require('../utils/utils')
  , config = require('../config/config')
    , emailer = require('../utils/emailer')
    ;

var app_user = {};

/**
 * Logout
 */

exports.logout = function (req, res) {
  req.logout()
  res.send('logged out successfully.');
}


/**
 * Create user
 */

exports.create = function (req, res) {
  var user = new User(req.body)
  user.provider = 'local';
  user.save(function (err) {
    if (err) {
      res.send('err : ' + err.message);
    }
    else{
      res.send('created successfully');
      emailer.sendEmail(user);
    }
  })
}

/**
 *  Show profile
 */

exports.getUser = function (req, res) {
  var user = req.profile;
  res.send(user.toJSON());
}

/**
 * Find user by id
 */

exports.user = function (req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err)
      if (!user) return next(new Error('Failed to load User ' + id))
      req.profile = user
      next()
    })
}


/*
* find user by unique id
* */


exports.UniqueIdUser = function(req, res, next, id){
  console.log('in unique id user');
  User
      .findOne({name: id})
      .exec(function(err, user){
       console.log('got user by unique id');
       if (err) return next(err)
       if (!user) return next(new Error('Failed to load User ' + id))
       req.profile = user
       next();
      })
}


/*
* activate user
* */

exports.activateUser = function(req, res){
  console.log('in activate user');
  var user = req.profile;
  console.log(user.name);
  user.active = true;
  user.save(function(err, users, noOfUpdates){
    if (err) throw err;
     console.log('activated successfully');
     res.send('activation successful');
  })
}