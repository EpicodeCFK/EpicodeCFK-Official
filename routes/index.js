var express = require('express');
var router = express.Router();
var passport = require('passport');
var session = require('express-session');

// required for passport session


/* GET home page. */
router.get('/', ensureAuthenticated, function(req, res, next) {
	req.session.save();
	res.render('index');
});

router.get('/support', function(req, res, next) {
	res.render('support');
});

//Python Course

router.get('/python-course', ensureAuthenticated,  function(req, res, next) {
	res.render('python-course');
});

//Section 1

router.get('/python-sections-1', function(req, res, next) {
	res.render('python-sections-1');
});

router.get('/download-python', function(req, res, next) {
	res.render('download-python');
});

router.get('/download-python-quiz', ensureAuthenticated, function(req, res, next) {
	res.render('download-python-quiz');
});

router.get('/the-python-shell', ensureAuthenticated, function(req, res, next) {
	res.render('the-python-shell');
});

router.get('/the-python-shell-quiz', ensureAuthenticated, function(req, res, next) {
	res.render('the-python-shell-quiz');
});

router.get('/the-python-shell-quiz-2', ensureAuthenticated, function(req, res, next) {
	res.render('the-python-shell-quiz-2');
});

router.get('/numbers-but-no-words', ensureAuthenticated, function(req, res, next) {
	res.render('numbers-but-no-words');
});

router.get('/data-types', ensureAuthenticated, function(req, res, next) {
	res.render('data-types');
});

router.get('/variables', ensureAuthenticated, function(req, res, next) {
	res.render('variables');
});

router.get('/functions-1', ensureAuthenticated, function(req, res, next) {
	res.render('functions-1');
});

router.get('/functions-2', ensureAuthenticated, function(req, res, next) {
	res.render('functions-2');
});

router.get('/finish-section-1', ensureAuthenticated, function(req, res, next) {
	res.render('finish-section-1');
});

//Section 2

router.get('/python-section-2', ensureAuthenticated, function(req, res, next) {
	res.render('python-section-2');
});

router.get('/booleans', ensureAuthenticated, function(req, res, next) {
	res.render('booleans');
});

router.get('/boolean-operators', ensureAuthenticated, function(req, res, next) {
	res.render('boolean-operators');
});

router.get('/if-else', ensureAuthenticated, function(req, res, next) {
	res.render('if-else');
});

router.get('/if-elif-else', ensureAuthenticated, function(req, res, next) {
	res.render('if-elif-else');
});

router.get('/import', ensureAuthenticated, function(req, res, next) {
	res.render('import');
});

router.get('/while-loops', ensureAuthenticated, function(req, res, next) {
	res.render('while-loops');
});

router.get('/try-except', ensureAuthenticated, function(req, res, next) {
	res.render('try-except');
});

router.get('/try-except-else-finally', ensureAuthenticated, function(req, res, next) {
	res.render('try-except-else-finally');
});

router.get('/finish-section-2', ensureAuthenticated, function(req, res, next) {
	res.render('finish-section-2');
});

//Section 3

router.get('/setup', ensureAuthenticated, function(req, res, next) {
	res.render('setup');
});

router.get('/if-statements', ensureAuthenticated, function(req, res, next) {
	res.render('if-statements');
});

router.get('/errors', ensureAuthenticated, function(req, res, next) {
	res.render('errors');
});

router.get('/finish-python-basics', ensureAuthenticated, function(req, res, next) {
	res.render('finish-python-basics');
});


function ensureAuthenticated(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}


	res.redirect('/users/login');
}

module.exports = router;
