/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

/**================================= MODULE DEPENDENCIES ==*/
var express = require('express');
var bitcoin = require('bitcoin');
var getJson = require('get-json');
var exec = require('child_process').exec;

// set up the db with the copy of the config.json
var jsondb = require('node-json-db');
var db = new jsondb('./db/db');

var btc = db.getData("/btc");

// begin new express router instance
var api = express.Router();
// set authentication for bitcoind
var client = new bitcoin.Client({
	host:btc.host,
	port:btc.port,
	user:btc.user,
	pass:btc.pass,
	timeout:btc.timeout
});

/**================================= MIDDLEWARE ==*/
// TODO: logging, maybe caching

/**================================= API ROUTES ==*/
api.get('/', function(req, res) {
	// /api/
	res.status(200).json({ online: true })
});

api.get('/minihelp', function(req, res) {
	// /api/minihelp - display json of info about routes
	var help = require('./network-help');
	// simple json response with json header
	res.status(200).json(help)
});

api.get('/livesince', function(req, res) {
	var liveSince = db.getData('/system/liveSince')
	// /api/livesince
	res.status(200).json({livesince: liveSince})
});

// Get your network's external facing ip
api.get('/ip', function (req, res) {
	// /api/ip
	getJson('https://api.ipify.org/?format=json', function(err, response) {
		if (err) return res.send(err);
		res.status(200).json({ external_ip: response.ip })
	});
});

// Get the external block from the network not the Mini
api.get('/externalblock', function (req, res) {
	// /api/externalblock
	getJson('https://api.smartbit.com.au/v1/blockchain/totals', function(err, response) {
		if (err) return res.send(err);
		res.status(200).json(response)
	});
});

// Get the network stats from the network not the Mini
api.get('/networkstats', function (req, res) {
	// /api/networkstats
	getJson('https://api.smartbit.com.au/v1/blockchain/stats', function(err, response) {
		if (err) return res.send(err);
		res.status(200).json(response)
	});
});

/*================================= API bitcoind calls ==*/

api.get('/help', function(req, res) {
	// /api/help
	client.cmd('help', function(err, response, resHeaders) {
		if (err) return res.send(err);
		res.status(200).json({ "bitcoin_help": response })
	});
});

// Get info about your bitcoin instance
api.get('/getinfo', function (req, res) {
	// /api/getinfo
	client.cmd('getinfo', function(err, response, resHeaders) {
		if (err) return res.send(err);
	    res.status(200).json(response)
	});
});


// Get the Mini's block count
api.get('/getblock', function(req, res) {
	// /api/getblock
	client.cmd('getblockcount', function(err, response, resHeaders) {
		if (err) return res.send(err);
		res.status(200).json({ "blockcount": response })
	});
});

// Get the network's current proof of work difficulty
api.get('/getdifficulty', function(req, res) {
	// /api/getdifficulty
	client.cmd('getdifficulty', function(err, response, resHeaders) {
		if (err) return res.send(err);
		res.status(200).json({ "difficulty": response })
	});
});

// Get a bunch of info about your connected peers
api.get('/getpeerinfo', function(req, res) {
	// /api/getpeerinfo
	client.cmd('getpeerinfo', function(err, response, resHeaders) {
		if (err) return res.send(err);
		res.status(200).json(response)
	});
});


// Validate an address returns json
api.get('/validate/:addr', function(req, res) {
	// /api/validate/
	client.cmd('validateaddress',req.params.addr,function(err, response, resHeaders) {
	    if (err) return res.send(err);
	    res.status(200).json(response);
	});
});

// cover for all other bitcoind rpc calls
api.get('/bitcoin/:cmd', function(req, res) {
	// api/bitcoin/
	client.cmd(req.params.command, function(err, response, resHeaders) {
	    if (err) return res.send(err);
	    res.status(200).json(response);
	});
});

// Is an update available
api.get('/update', function (req, res) {

	getJson('https://bitcoinmini.com/nodeData/alerts.php', function(err, response) {
		if (err) return res.send(err);

		// if the Mini has the latest version available
		if (response.upgrade == version) {
			
			// tell the client they do not need to update
			res.status(200).json({ needsUpdate: false });
			
		// if the Mini doesn't have the latest version
		} else {

			// tell the client it needs to update
			res.status(200).json({ needsUpdate: true, version: response.upgrade });
		}
	});
});

/**
 *	404
 *	
 *	Catches all undefined routes
 *  TODO make a custom 404 page
 */
api.get('/*', function(req, res) {
	// 404
	res.status(404).json({ 
		error: '404: that call is not recognized.' })
});

// export all these routes to the mini instance of expressjs
module.exports = api;