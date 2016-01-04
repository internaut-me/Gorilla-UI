#!/usr/bin/env node

/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */
'use strict';

//================================= MODULE DEPENDENCIES ==
var fs = require('fs-extra');
var db = require('./db/db.json');

if(db) {
	fs.writeJson('./config.json', db, function (err) {
		if (err) { console.log(err.message);} else {
			console.log('Config changes saved. Press enter to get the prompt. Use npm start to restart the server. Goodbye.');
		}
	});
} else { console.log('could not retrieve db.'); }