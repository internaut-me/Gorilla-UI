#!/usr/bin/env node

/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

//================================= MODULE DEPENDENCIES ==
var fs = require('fs-extra');

var config = require('../../config');

btcConf();
/**
 * 	Check and correct bitcoind rpc password
 *
 * 	On boot we check if the config.json password is correct with bitcoin.conf
 * 	If its not the same we backup the content, and then set it to the correct value.
 */
// Get contents from bitcoin.conf on the Mini
function btcConf() {

	// Change the timestamp value
	config.system.liveSince = Date.now();
	
	fs.readFile('/home/'+config.system.root+'/.bitcoin/bitcoin.conf','utf8', function (err, data) {
		if (err) throw err;

		// break down the file by lines
		var lines = data.split(/\r?\n/),x,opts = [];
		// create variable we will check later
		var bitcoinconfData = '';

		// look at all lines in .conf
		for (x in lines){

			// associate each line as key value pairs
			var cur = lines[x].split("=");

			// if the key = rpcpassword
			if(cur[0] == 'rpcpassword'){

				// set our value as the current value in the bitcoin.conf file
				bitcoinconfData = cur[1];

				// Change the bitcoind password
				config.btc.pass = bitcoinconfData;
				
				// create the database from the config file
				// every time the server is shutdown and started again
				// it is reset to defaults
				fs.writeJson('/home/'+config.system.root+'/Gorilla-UI/db/db.json', config , function (err) {
					if (err) console.log(err);
				});
			}
		}
	});
	
}

