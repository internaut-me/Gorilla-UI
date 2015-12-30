#!/usr/bin/env node

/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

/*================================= MODULE DEPENDENCIES ==*/
var fs = require('fs-extra');
var config = require('../../config.tmp.json');

/**
 * 	Set the time the Mini's server was started
 * 	On boot we set the time in the config.json so we can access it in the view.
 */

module.exports = function liveSince() {

	// Change the timestamp value
	config.system.liveSince = Date.now();
	// Overwrite all contents of config with changes
	fs.writeJson('./config.tmp.json', config , function (err) {
		if (err) console.log(err);
	});
}

