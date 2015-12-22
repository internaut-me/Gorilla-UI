#!/usr/bin/env node

/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

//================================= MODULE DEPENDENCIES ==
var express = require('express');
var config = require('./config');
var bootTasks = require('./bin/boot');

// Do a bunch of tasks when you start node
// Each task can be run from the commandline too
bootTasks();

//================================= PARENT EXPRESS ==
// parent express instance
var mini = express();

//================================= ROUTES ==
// bring in the lib folder and pass it the mini instance
require('./lib')(mini);

//================================= SERVER LISTEN ==
mini.listen(config.system.PORT);
// print message to console
var bootMessage = require('./bin/boot-message');
bootMessage();