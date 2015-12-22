/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

// Require in the explorers.json for default explorer
var express = require('express');
var miniuser = require('../config');
var config = require( './explorers/explorers' );
var path = require('path');

// configure the mini express instance
// order is important
// TODO document this
module.exports = function (mini) {
	// set the location of guerilla public assets 
    // /guerilla/client/public/img will be public/img in html files
	mini.use(express.static( path.resolve( '/home/'+ miniuser.system.root +'/client' ))); 

	// Routes =======================================
	// /admin for settings
	mini.use( '/admin', require( './config' ));
    // /api for bitcoind and system
    mini.use( '/api', require( './network' ));
    // /explorer for third party explorers
    mini.use( '/explorer', require( './explorers/' + config.default ));

    // everything else route to guerilla ui
    mini.get( '/*', function (req, res) {
        res.sendFile( path.join('/home/'+ miniuser.system.root +'/client/index.html' ));
    });
};