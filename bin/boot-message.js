/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

var config = require('../config');
var colors = require('colors');
var internalIp = require('internal-ip');
// get the internal ip and export it as a variable
var ip = internalIp.v4();

module.exports = function bootMessage() {
	console.log('');
	console.log('    __  ____       _    ______                            __  _            '.red);
	console.log('   /  |/  (_)___  (_)  / ____/___  ____ ___  ____  __  __/ /_(_)___  ____ _'.red);
	console.log('  / /|_/ / / __ \\/ /  / /   / __ \\/ __ `__ \\/ __ \\/ / / / __/ / __ \\/ __ `/'.red);
	console.log(' / /  / / / / / / /  / /___/ /_/ / / / / / / /_/ / /_/ / /_/ / / / / /_/ / '.red);
	console.log('/_/  /_/_/_/ /_/_/   \\____/\\____/_/ /_/ /_/ .___/\\__,_/\\__/_/_/ /_/\\__, /  '.red);
	console.log('                                         /_/                      /____/   '.red);
	console.log('(C) Mini Computing 2015');
	console.log('MIT License');
	console.log('===========================================================================');
	console.log('');
	console.log('Your Mini can now be accessed via your browser at '+ ip +':' + config.system.PORT);
	console.log('');
	console.log('The api can be found at '+ ip +':'+ config.system.PORT +'/api');
	console.log('');
	console.log('Supporting docs can be found at '+ ip +':'+ config.system.PORT +'/docs');
	console.log('');
	console.log('===========================================================================');
	console.log('');
};