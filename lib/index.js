/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */
'use strict';

var express = require('express');
var explorers = require( './explorers/explorers' );

// configure the mini express instance
// order is important
// TODO document this
module.exports = function (mini) {

	// set the location of guerilla public assets 
    // your route will be /public/img
    // This must be first to catch all the assets requests from the client
	mini.use(express.static( rootDir +'/client' ));

	// Routes
	// /admin for settings
	mini.use( '/admin', require( './admin' ));
    // /api for bitcoind and system
    mini.use( '/api', require( './network' ));
    // /explorer for third party explorers
    mini.use( '/explorer', require( './explorers/' + explorers.default ));

    // everything else route to guerilla ui
    mini.get( '/*', function (req, res) {
        res.sendFile( rootDir +'/client/index.html' );
    });
};