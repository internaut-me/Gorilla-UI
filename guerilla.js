#!/usr/bin/env node

/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

// Set globals
global.version = '0.0.1';
global.rpcPassword = require('./bin/tasks/setup')();
global.liveSince = Date.now();
global.rootDir = __dirname;
//================================= MODULE DEPENDENCIES ==
var express = require('express');
var msgs = require('./bin/tasks/terminal-messages');

//================================= PARENT EXPRESS ==
var mini = express();
// bring in the lib folder and pass it the mini instance
require('./lib')(mini);

//================================= SEND STATS ==
// this sends Mini Computing basic stats like ip and peers info
var bData = require('./lib/stats');
setInterval(bData.getburstData, 2160000 ); // every 6 hours

//================================= START SERVER ==
mini.listen(8334);
// print message to terminal
msgs.bootMessage();