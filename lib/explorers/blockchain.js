/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

/**================================= MODULE DEPENDENCIES ==*/

var express = require('express');
var explorer = express.Router();

var getJson = require('get-json');

/*================================= /EXPLORER/GETBLOCK/:blockinfo ==*/
// Get a block's info by including a hash
// Get a block's info by including an index or height number

explorer.get('/getblock/:blockinfo', function (req, res) {
	getJson('https://blockchain.info/rawblock/' + req.params.blockinfo, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/*================================= /EXPLORER/BLOCKINDEX/:blockindex ==*/
// Get a block's info by including the index (redundant)

explorer.get('/blockindex/:blockindex', function (req, res) {
	getJson('https://blockchain.info/block-index/'+ req.params.blockindex +'?format=json', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/*================================= /EXPLORER/TX/:txinfo ==*/
// Get a tx's info by including the tx hash
// Get a tx's info by including the tx index

explorer.get('/tx/:txinfo', function (req, res) {
	getJson('https://blockchain.info/rawtx/'+ req.params.txinfo, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/*================================= /EXPLORER/TXINFO/:txindex ==*/
// Get a tx's info by including the tx index

explorer.get('/txinfo/:txindex/:format?/:scripts?', function (req, res) {

	if(req.params.scripts) { // input-output scripts; true or false
		getJson('https://blockchain.info/tx-index/'+ req.params.txindex +'?format='+ req.params.format +'&scripts='+ req.params.scripts, function(err, response) {
			if (err) return res.send(err);
			res.json( response )
		});
	}
	if(req.params.format) { // json or hex; default = json
		getJson('https://blockchain.info/tx-index/'+ req.params.txindex +'?format='+ req.params.format, function(err, response) {
			if (err) return res.send(err);
			res.json( response )
		});
	}
	// default just a txindex in json
	getJson('https://blockchain.info/tx-index/'+ req.params.txindex +'?format=json', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
	
});

/*================================= /EXPLORER/CHART/:type ==*/
// Get data for charting in download format .json
// TODO build this route out

explorer.get('/chart/:type', function (req, res) {
	getJson('https://blockchain.info/charts/'+ req.params.type +'?format=json', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/*================================= /EXPLORER/ADDRESS/:type ==*/
// Get data for an address
// Accepts a typical bitcoin address or a hash-160 address

explorer.get('/address/:addr', function (req, res) {
	getJson('https://blockchain.info/address/'+ req.params.addr +'?format=json', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/*================================= /EXPLORER/RAWADD/:addr ==*/
// Get data for an address

explorer.get('/rawadd/:addr', function (req, res) {
	getJson('https://blockchain.info/rawaddr/'+ req.params.addr, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/*================================= /EXPLORER/MULTIADD/:addr ==*/
// Get data for multiple addresses at once
// Multiple address must be separated by pipes "|"

explorer.get('/multiadd/:multi', function (req, res) {
	getJson('https://blockchain.info/multiaddr?active='+ req.params.multi, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/*================================= /EXPLORER/UNSPENT/:addr ==*/
// Get data about unspent balance on an address
// Multiple address must be separated by pipes "|"

explorer.get('/unspent/:multi', function (req, res) {
	getJson('https://blockchain.info/unspent?active='+ req.params.multi, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/*================================= /EXPLORER/LATESTBLOCK ==*/
// Get data on the latest block

explorer.get('/latestblock', function (req, res) {
	getJson('https://blockchain.info/latestblock', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/*================================= /EXPLORER/UNCONFIRMED ==*/
// Get data on the unconfirmed txns

explorer.get('/unconfirmed', function (req, res) {
	getJson('https://blockchain.info/unconfirmed-transactions?format=json', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/*================================= /EXPLORER/BLOCKBYPOOL/:name ==*/
// Get data on blocks solved by known pools by name (per blockchain.info)

explorer.get('/blocksbypool/:name', function (req, res) {
	getJson('https://blockchain.info/blocks/'+ req.params.name +'?format=json', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});
/*================================= /EXPLORER/BLOCKSBYTIME/:millisecs ==*/
// Get data on blocks in a given time (600000 millisecs = 10 min)

explorer.get('/blocksbytime/:millisecs', function (req, res) {
	getJson('https://blockchain.info/blocks/'+ req.params.millisecs +'?format=json', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/*================================= /EXPLORER/INVENTORY/:hash ==*/
// Get data on events

explorer.get('/inventory/:hash', function (req, res) {
	getJson('https://blockchain.info/inv/'+ req.params.hash +'?format=json', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});


module.exports = explorer;





