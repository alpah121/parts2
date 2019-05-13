const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

//call models
var emails = require('../models/emails');

// Welcome Page
//router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/crm', ensureAuthenticated, (req, res) => {
	emails.find(function(err, emails) 
		{
		res.render('crm', {emails: emails} );
		});
});

var parts = require('../models/part');

router.get('/dashboard', ensureAuthenticated, (req, res) => {
	parts.find(function(err, parts)
		{
		res.render('dashboard', {topSelling: parts} );	
		});
});

router.post('/parts/new', ensureAuthenticated, function (req, res) {
	if (Array.isArray(req.body))
		{
		parts.insertMany(req.body, function(error, newParts) {
			if (error) 
				{
				console.log(error);
				}
				
			 });	
		}
});

router.get('/getEmail/:partID', function(req, res) {
	parts.findOne({id: req.params.partID}, function(error, part) { res.render('getEmail', {part: part});});
});

router.post('/getEmail', function (req, res) {
	//name, email, lookedAt
	var email = new emails(req.body);
	email.save(function (error, email) {if (error) console.log(error)});
});

router.get('/', function(req, res) {
	res.render('home');
	});

router.get('/search', function(req, res) {
	if (req.query.hasOwnProperty('q'))
	{
	part.find({ keywords: req.query.q}, 
	function (err, parts) 
		{
		if (err) console.log(err);
		res.render('results', {results: parts});
		});
	}
	else
	{
	console.log(req.query.q);
	res.render('results', {results: [
	{title: 'wheel of pressure washer', goesTo: 'pressure washer', link: 'amazon.com/pressure-washer-wheel'},
	{title: 'wheel of log cutter', goesTo: 'log cutter', link: 'amazon.com/log-cutter-wheel'},
	{title: 'sprocket', goesTo: 'dirt bike', link: 'amazon.com/sprocket'},
	
	]});
	}
});

module.exports = router;
