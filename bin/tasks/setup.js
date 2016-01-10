#!/usr/bin/env node

/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

//================================= MODULE DEPENDENCIES ==
var fs = require('fs-extra');

module.exports = function() {
	// Get contents from /home/<miniuser>/.bitcoin/bitcoin.conf
	// can only be called from Gorilla-UI folder
	var file = fs.readFileSync('../.bitcoin/bitcoin.conf','utf8');

	// break down the file by lines
	var lines = file.split(/\r?\n/),x,opts = [];
	// look at all lines in .conf
	for (x in lines){
		// associate each line as key value pairs
		var cur = lines[x].split("=");
		// assign them to the global variables
		if(cur[0] == 'rpcpassword') { return cur[1]; }
	}		
}

