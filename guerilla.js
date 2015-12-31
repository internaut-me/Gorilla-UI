#!/usr/bin/env node

/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';
var version = '1.4.0';
//================================= MODULE DEPENDENCIES ==
var express = require('express');
var config = require('./config');
var bootTasks = require('./bin/boot');

// Essential start tasks
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