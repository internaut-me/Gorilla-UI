#!/usr/bin/env node

/*!
 * guerilla-mini
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

	// Execute them with async so that the config.json is only exposed in the first function.
	// All other functions will use the config.tmp.json
	// We never write to config.json only read, write to config.tmp.json
	// All other areas of the app use config.tmp
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
	    },
	    function() {
	    	// check for updates to gorilla
	    	var checkUpdate = require('./tasks/update');
	    	checkUpdate();
	    } 
	]);
}