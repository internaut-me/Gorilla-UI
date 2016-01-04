/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

// Require in the explorers.json for default explorer
var express = require('express');
var explorers = require( './explorers/explorers' );
var path = require('path');
var fs = require('fs-extra');
var morgan = require('morgan');
var config = require('../config');

// configure the mini express instance
// order is important
// TODO document this
module.exports = function (mini) {

	// set the location of guerilla public assets /client/public/img will be /img
    // This must be first to catch all the assets requests from the client
	mini.use(express.static( path.resolve( '/home/'+config.system.root+'/Gorilla-UI/client' )));

    /**
     *  Middleware
     *
     *  TODO security middleware function
     */
    // Logger: used for all routes
    // create a write stream (in append mode)
    var accessLogStream = fs.createWriteStream(__dirname + '/stats/access.log', {flags: 'a'});
    mini.use(morgan('combined', {stream: accessLogStream}))


	// Routes
	// /admin for settings
	mini.use( '/admin', require( './admin' ));
    // /api for bitcoind and system
    mini.use( '/api', require( './network' ));
    // /explorer for third party explorers
    mini.use( '/explorer', require( './explorers/' + explorers.default ));

    // everything else route to guerilla ui
    mini.get( '/*', function (req, res) {
        res.sendFile( path.join('/home/'+config.system.root+'/Gorilla-UI/client/index.html' ));
    });
};