#!/usr/bin/env node

/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

var async = require("async");
var fs = require('fs-extra');

/*================================= MODULE DEPENDENCIES ==*/
module.exports = function bootTasks() {

	// maybe delete these
	//var ipEmail = require('./tasks/ip-email');
	//ipEmail();

	// Limit the exposure of config.json to the copy function
	// Guerilla uses config.tmp.json from here on out
	async.series([
		function() {
			// make a copy of the config.json
			fs.copy('./config.json', './config.tmp.json', function (err) {
			    if (err) return console.error(err)
			});
		},
		function() {
			// check the bitcoind password is correct
			var btcConf = require('./tasks/conf-setup');
			btcConf();
		},
	    function() {
	    	// set the time the server was started
	    	var liveSince = require('./tasks/time-running');
	    	liveSince();
	    }
	]);
}