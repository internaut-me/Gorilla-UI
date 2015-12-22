/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */
 
'use strict';

var internalIp = require('internal-ip');
// get the internal ip and export it as a variable
var miniip = module.exports = internalIp.v4();