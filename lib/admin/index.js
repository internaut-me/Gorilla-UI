/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */
 
'use strict'; 

/**================================= MODULE DEPENDENCIES ==*/

var express = require('express');
var fs = require('fs-extra');

// set up the db with the copy of the config.json
var jsondb = require('node-json-db');
var db = new jsondb('./db/db');

// begin new express router instance
var adminApi = express.Router();

//================================= MIDDLEWARE ==
/**
 *
 *	TODO: logging, simple pin authentication
 *  If any routes need protection it's these and the future wallet routes
 */ 

//================================= CONFIG ==
/**
 *	System config Routes	
 *	
 *	TODO POST routes to change some settings
 */
// View system settings
adminApi.get('/', function (req, res) {

	var data = db.getData('/');

	res.status(200).json(data);
});
adminApi.get('/edit/email/:newEmail', function (req, res) {
	// db push
	db.push("/email/address",req.params.newEmail);
	// Send something back
	res.status(200).json({done:true});
});
adminApi.get('/edit/timeout/:newTimeout', function (req, res) {
	var timeout = parseInt(req.params.newTimeout)
	// db push
	db.push("/btc/timeout", timeout);
	// Send something back
	res.status(200).json({done:true});
});
adminApi.get('/edit/email/notifications/enable', function (req, res) {
	// db push
	db.push("/email/notifications",true);
	// send something back
	res.status(200).json({notifications:true});
});
adminApi.get('/edit/email/notifications/disable', function (req, res) {
	// db push
	db.push("/email/notifications",false);
	// send something back
	res.status(200).json({notifications:false});
});

//================================= COMMAND LINE ==
/**
 *	System Command line Routes
 *	
 *	These are sensitive and need authentication if your Gorilla is exposed to the internet
 *  TODO security
 */
// Straight shutdown to protect bitcoind
adminApi.get('/system/shutdown', function(req, res) {
	exec("bitcoin-cli stop && sudo shutdown -t now 0");
});
// Reboot if needed
adminApi.get('/system/restart', function(req, res) {
	exec("bitcoin-cli stop && sudo reboot");
});
// Restart server only, bitcoin and Linux unaffected
adminApi.get('/system/restartguerilla', function(req, res) {
	exec("pm2 restart");
});
/**
 *	Install a new version
 *
 *	Pull down the new version
 *  Restart pm2
 *	Bitcoin is unaffected
 */
adminApi.get('/system/update', function(req, res) {
	exec("~/./.update.sh");
});

// export all these routes to the mini instance of expressjs
module.exports = adminApi;