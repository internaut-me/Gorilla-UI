#!/usr/bin/env node

/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */
'use strict';

//================================= MODULE DEPENDENCIES ==
var request = require('request');
var getJson = require('get-json');
var exec = require('child_process').exec;
var async = require('async');

// Export the function so we can call it
module.exports = {
	// we can call this from a file that we require this file into
	// example: var burst = require('./lib/stats'); burst.getburstData();
	"getburstData": function() {
		var burstData = {};
		
		// function to cover most of our api calls
		// the field input is to name the response.field from the query callback
		function grabData(apiCall, field, cb) {
			getJson('http://192.168.0.160:8334/api/'+apiCall, function(err, response) {
		        if (err) return console.log(err);
		        burstData[apiCall] = response[field];
		        cb();
		    });
		}
		// need a slightly different "= response"
		function peerinfo(cb){
			getJson('http://192.168.0.160:8334/api/getpeerinfo', function(err, response) {
		        if (err) return console.log(err);
		        burstData['peers'] = response;
		        cb();
		    });
		}
		// direct call to command line
		// the field input is to name the burstData.field
		function cmd( command, field, cb ){
			exec(command, function (err, stdout, stderr) {
				if (err) return console.log(err); 
				burstData[field] = stdout;
				cb();
			})
		}
		// get the ip info about this Mini
		function getGIP(ip, cb){
			getJson('http://freegeoip.net/json/'+ip, function(err, response) {
		        if (err) return console.log(err);
		        burstData['ipInfo'] = response;
		        cb();
		    });
		}
		// function to send the data to bitcoinmini.com
		function prepData(burstData, cb){ 

			// post the request
			request.post('https://bitcoinmini.com/nodeData/catcher/index.php', {
				// fill in the data as a form to post lots of data
				form: {
					ip: burstData.ip,
					blockcount: burstData.blockcount,
					miniID: burstData.miniID,
					up: burstData.livesince,
					ip_info: burstData.ipInfo,
					peers: burstData.peers
				}
			},  
			// call a function to handle the response
			function(err,res,bod){
					if (err) return console.log(err);
					// if there is no error and the status code is 200
					if(!err && res.statusCode == 200){
						console.log(bod);
						cb();
					}
				}
			);
		}

		// execute in an async series
		async.series([
			function(cb){ grabData('getblock', 'blockcount', cb) },
			function(cb){ cmd('hostname', 'miniID', cb) },
			function(cb){ grabData('livesince', 'livesince', cb) },
			function(cb){ grabData('ip', 'external_ip', cb) },
			function(cb){ getGIP(burstData.ip, cb) },
			function(cb){ peerinfo(cb) },
			function(cb){ prepData(burstData, cb)}
		]); // end series
	}
}
