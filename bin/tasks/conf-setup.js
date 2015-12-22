#!/usr/bin/env node

/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

/*================================= MODULE DEPENDENCIES ==*/
var fs = require('fs-extra');
var config = require('../../config');
/**
 * Check and correct bitcoind rpc password
 * On boot we check if the config.json password is correct with bitcoin.conf
 * If its not the same we backup the content, and then set it to the correct value.
 */
 
// Get contents from bitcoin.conf on the Mini
module.exports = function btcConf() {

	//var config = require('./config');
	
	fs.readFile('/home/'+config.system.root+'/.bitcoin/bitcoin.conf','utf8', function (err, data) {

		if (err) throw err;

		// break down by lines
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

				// only change if they aren't equal
				if(bitcoinconfData !== config.btc.pass) {

					// Backup file in tmp folder
					fs.writeJson('./bin/tmp/backup_config.json', config , function (err) {
						if (err) console.log(err);
					});

					// Change the bitcoind password
					config.btc.pass = bitcoinconfData;

					// Overwrite all contents of config with changes
					fs.writeJson('./config.json', config , function (err) {
						if (err) console.log(err);
					});
				}
			}
		}
	});
}

