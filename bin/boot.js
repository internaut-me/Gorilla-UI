#!/usr/bin/env node

/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

/*================================= MODULE DEPENDENCIES ==*/
module.exports = function bootTasks() {

	var btcConf = require('./tasks/conf-setup');
	btcConf();

	var ipEmail = require('./tasks/ip-email');
	//ipEmail();

	var liveSince = require('./tasks/time-running');
	liveSince();

	var checkUpdate = require('./tasks/update');
	checkUpdate();
}