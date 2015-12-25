/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */
 
'use strict'; 

/**================================= MODULE DEPENDENCIES ==*/

var express = require('express');
var config = require('../../config');
var users = require('./users.json');
var fs = require('fs-extra');

var configApi = express.Router();

/**================================= MIDDLEWARE ==*/
// TODO: logging, maybe caching

/**================================= /ADMIN ==
 *
 *	A help type route that displays all calls
 *	TODO add the bitcoinjs-lib calls etc
 */

// View settings in config.json
configApi.get('/', function (req, res) {
	res.status(200).json(config)
});

// View users
configApi.get('/users', function (req, res) {
	res.status(200).json(users)
});
// Add a user
// configApi.post('/users', function (req, res) {
// 	//if(!req.username) return;
// 	var email = req.params.email; var pass = req.pass; var pin = req.pin;

// 	// read in json and modify
// 	fs.readJson('./users.json', function (err, users) {
	   
// 		// Backup file in tmp folder
// 		fs.writeJson('../bin/tmp/backup_users.json', users , function (err) {
// 			if (err) console.log(err);
// 			console.log('backup successful');
// 		});

// 		// Parse, push, stringify
// 		var users = JSON.parse(users);
// 		users.push({
// 			req.username: {
// 				"email": email,
// 				"pass": pass,
// 				"pin": pin
// 			} 
// 		});
// 		users = JSON.stringify(users);

// 		// Write file in tmp folder
// 		fs.writeJson('./users.json', users , function (err) {
// 			if (err) console.log(err);
// 			console.log('New user successfully added.');
// 		});

// 	});
// }); // end adding new user

// // View info of one user
// configApi.get('/users/:name', function (req, res) {

// 	var user = users[req.params.name];

// 	user = JSON.parse(user);
// 	res.json(user)
// });

// // Update a single user
// configApi.post('/users/:name', function (req, res) {

// 	var username = req.param.username;
// 	var email = req.param.email;
// 	var pass = req.param.password;
// 	var pin = req.param.pin;

// 	// read in json and modify
// 	fs.readJson('./users.json', function (err, users) {
	   
// 		// Backup file in tmp folder
// 		fs.writeJson('../bin/tmp/backup_users.json', users , function (err) {
// 			if (err) console.log(err);
// 			console.log('backup successful');
// 		});

// 		var oldUsername = users[username];
// 		var oldEmail = users[username].email;
// 		var oldPass = users[username].pass;
// 		var oldPin = users[username].pin;

// 		// Parse, push, stringify
// 		var users = JSON.parse(users);

// 		if(oldEmail !== email && email !== '') {
// 			users[oldUsername].email = email;
// 		}
// 		if(oldPass !== pass && pass !== '') {
// 			users[oldUsername].pass = pass;
// 		}
// 		if(oldPin !== pin && pin !== '') {
// 			users[oldUsername].pin = pin;
// 		}
// 		if(oldUsername !== username && username !== '') {
// 			users[oldUsername] = username;
// 		}

// 		users = JSON.stringify(users);

// 		// Write file in tmp folder
// 		fs.writeJson('./users.json', users , function (err) {
// 			if (err) console.log(err);
// 			console.log('User info updated.');
// 		});

// 	});
// });

// View system settings
configApi.get('/system', function (req, res) {

	var system = config.system;
	res.status(200).json(system)
});
// View only the version of guerilla
configApi.get('/system/version', function (req, res) {

	var version = config.system.version;
	res.status(200).json(version)
});
// How long has your server been running
configApi.get('/system/livesince', function (req, res) {

	var liveSince = config.system.liveSince;
	res.status(200).json(liveSince)
});
// might move
configApi.get('/explorers', function (req, res) {

	var explorers = config.explorer;
	res.status(200).json(explorers)
});
// Is an update available
configApi.get('/update', function (req, res) {

	if(config.system.version.current == config.system.version.available) {
		res.status(200).json({ needsUpdate: false });
	}
	if(config.system.version.current !== config.system.version.available) {
		res.status(200).json({ needsUpdate: true, version: config.system.version.available });
	}
});

// export all these routes to the mini instance of expressjs
module.exports = configApi;