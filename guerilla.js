#!/usr/bin/env node

/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

//================================= MODULE DEPENDENCIES ==
global.version = '1.5.0';
var express = require('express');
var config = require('./config');
var fs = require('fs-extra');
var msgs = require('./bin/tasks/terminal-messages');

//================================= PARENT EXPRESS ==
var mini = express();

// bring in the lib folder and pass it the mini instance
require('./lib')(mini);

// on ending the Gorilla-UI process we want to save the db back to config.json
// catch the exit
process.stdin.resume();
// this catches the Ctrl+C type of exit
process.on('SIGINT', function() {
	// get the current db
	var db = require('./db/db.json');
	if(db) {
		// write it to the config.json
		fs.writeJson('./config.json', db, function (err) {
			if (err) { console.log(err.message);} else {
				// give a little heads up on the terminal
				msgs.saveMessage();
			}
		});
		// if we failed to get the db, oops we couldn't save the new settings
	} else { console.log('could not retrieve db. Your changed settings were not saved.'); }
});

//================================= START SERVER ==
mini.listen(config.system.PORT);

// print message to terminal
msgs.bootMessage();
