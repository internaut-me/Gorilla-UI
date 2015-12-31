/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */
 
'use strict'; 

/**================================= MODULE DEPENDENCIES ==*/

var express = require('express');
var config = require('../../config.tmp.json');
var users = require('./users.json');
var fs = require('fs-extra');

var adminApi = express.Router();

//================================= MIDDLEWARE ==
/**
 *
 *	TODO: logging, authentication
 *  This is the routes that need protection
*/ 

//================================= CONFIG ==
/**
 *	System config Routes	
 *	
 *	TODO POST routes to change some settings
 */
// View system settings
configApi.get('/', function (req, res) {
	var system = config.system;
	res.status(200).json(system)
});

//================================= COMMAND LINE ==
/**
 *	System Command line Routes
 *	
 *	These are sensitive and need authentication if your Gorilla is exposed to the internet
 *  TODO security
 */
// Straight shutdown to protect bitcoind
configApi.get('/system/shutdown', function(req, res) {
	exec("bitcoin-cli stop && sudo shutdown -t now 0");
});
// Reboot if needed
configApi.get('/system/restart', function(req, res) {
	exec("bitcoin-cli stop && sudo reboot");
});
// Restart server only, bitcoin and Linux unaffected
configApi.get('/system/restartguerilla', function(req, res) {
	exec("pm2 restart");
});
/**
 *	Install a new version
 *
 *	Pull down the new version to a tmp folder so avoid problems with interupted download
 *	Copy tmp dir to master dir
 *  Restart server
 *	Bitcoin is unaffected
 */
configApi.get('/system/update', function(req, res) {
	//exec("sudo pacman -Syu --noconfirm && cd ~/tmp/Gorilla-UI/ && git pull && cp -r ~/tmp/Gorilla-UI ~/Gorilla-UI/ && pm2 restart");
});

// export all these routes to the mini instance of expressjs
module.exports = adminApi;