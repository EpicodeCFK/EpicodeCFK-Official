var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({dest: './uploads'});
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var MongoStore = require('connect-mongostore')(session);
var mongoose = require('mongoose');


var User = require('../models/user');




/* GET users listing. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/register', upload.single('profileimage'),function(req, res, next) {
  var name = req.body.name;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  if(req.file){
  	console.log('Uploading File...');
  	var profileimage = req.file.filename;
  } else {
  	console.log('No File Uploaded...');
  	var profileimage = 'noimage.jpg';
  }

  //Form Validator
  req.checkBody('name', 'Name field is required').notEmpty();
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('password', 'Password field is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);


  // Check Errors
  var errors = req.validationErrors();

  if(errors){
  	res.render('register', {
  		errors: errors
  	});
  } else {
  	var newUser = new User({
  		name: name,
  		username: username,
  		password: password,
  		profileimage: profileimage
  	});

  	User.createUser(newUser, function(err, user){
  		if(err) throw err;
  		console.log(user);
  	});

  	

  	res.location('/users/login');
  	res.redirect('/users/login');
  }

});

router.get('/logout', function(req, res) {
	req.logout();
	console.log("logged out!");
	res.redirect('/users/login');
});

router.post('/login',
	passport.authenticate('local', {failureRedirect: '/users/login', failureFlash: 'Invalid username or password.'}),
	function(req, res) {
		console.log('Logged in');
		res.redirect('/');
});

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.getUserById(id, function(err,user){
		done(err, user);
	});
});

passport.use(new LocalStrategy(function(username, password, done) {
	User.getUserByUsername(username, function(err, user){
		if(err) throw err;
		if(!user){
			return done(null, false, {message: 'Unknown User'});

		}

		User.comparePassword(password, user.password, function(err, isMatch){
			if(err) return done(err);
			if(isMatch){
				return done(null, user);

			} else {
				return done(null, false, {message: 'Invalid Password'});

			}
		});
	});
}));



module.exports = router;