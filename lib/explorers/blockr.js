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

/**==========================================================
 *	Misc calls
 *	/coininfo
 *	/exchangerate
 */

// /coininfo - Get general info on bitcoin
explorer.get('/coininfo', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/coin/info', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /exchangerate - Get bitcoin's exchange rate
explorer.get('/exchangerate', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/exchangerate/current', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/**==========================================================
 *	Block information
 *	/blockinfo/:info
 *	/blockinfoafter/:date
 *	/txsinblock/:block
 *	/rawblock/:block
 */

// /blockinfo/:info - Get data on blocks
// Can be a hash, index number, "latest", or "first"
// If separated by a "," you'll receive multiple block data
explorer.get('/blockinfo/:info', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/block/info/'+ req.params.info, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /blockinfoafter/:date - Get data on the first block mined after a certain date
explorer.get('/blockinfoafter/:date', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/block/info/first?after='+ req.params.date, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /txsinblock/:block - Gets simple data on txns in a certain block
// Can use "last" for the latest block, or the block index number
// Can have multiple, by separating with ","
explorer.get('/txsinblock/:block', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/block/txs/'+ req.params.block, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /rawblock/:block - Gets raw data for a block
// Can use "last" for the latest block, or the block index number
// Can have multiple, by separating with ","
explorer.get('/rawblock/:block', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/block/raw/'+ req.params.block, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/**==========================================================
 *	Transaction information
 *	/txdata/:txid
 *	/txdatastring/:txid
 *	/rawtxdata/:txid
 *	/unconfirmed/:txid
 */

// /txdata/:txid - Gets data for a txn
// Can have multiple, by separating with ","
explorer.get('/txdata/:txid', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/tx/info/'+ req.params.txid, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /txdatastring/:txid - Gets data for a txn with amounts as type string
explorer.get('/txdatastring/:txid', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/tx/info/'+ req.params.txid +'?amount_format=string', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /rawtxdata/:txid - Gets raw data for a txn
// TODO test if multiple can be passed
explorer.get('/rawtxdata/:txid', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/tx/raw/'+ req.params.txid, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /unconfirmed/:txid - Gets data on an unconfirmed txn
explorer.get('/unconfirmed/:txid', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/zerotx/info/'+ req.params.txid, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

/**==========================================================
 *	Address information
 *	/address/:addr
 *	/address/ms/:addr
 *	/address/confirms/:addr/:confirms
 *	/address/valstring/:addr
 *	/address/balance/:addr/:confirms?
 *	/address/txns/:addr
 *	/address/unspent/:addr
 *	/address/unspent/:addr/:options?
 */

// /address/:addr - Gets data on an address
explorer.get('/address/:addr', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/address/info/'+ req.params.addr, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /address/ms/:addr - Gets data on a multi-sig address
// "It would be wrong to just add that amount to address's amount"
// must separate addresses by a ","
// Only txns in a block, not unconfirmed txns
explorer.get('/address/ms/:addr', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/address/info/'+ req.params.addr, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /address/confirms/:addr/:confirms - Gets data based on confirmations
// Gets data => confirmations given
// A "0" is all unconfirmed and confirmed txns for that address
explorer.get('/address/confirms/:addr/:confirms', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/address/info/'+ req.params.addr +'?confirmations='+ req.params.confirms, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /address/valstring/:addr - Gets data with amount as type "string"
// Default is "float", so this route is for the string variant only
explorer.get('/address/valstring/:addr', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/address/txs/'+ req.params.addr +'?amount_format=string', function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /address/balance/:addr/:confirms? - Gets balance data about an addresses balance
// Multiple addresses can be combined with a ","
// Optional input is the number of confirmations
explorer.get('/address/balance/:addr/:confirms?', function (req, res) {
	if(req.params.confirms) { // if there is the optional confirms given
		getJson('http://btc.blockr.io/api/v1/address/balance/'+ req.params.addr +'??confirmations='+ req.params.confirms, function(err, response) {
			if (err) return res.send(err);
			res.json( response )
		});
	}
	// else do this
	getJson('http://btc.blockr.io/api/v1/address/balance/'+ req.params.addr, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /address/txns/:addr - Gets txn data about transactions by address
// Multiple addresses can be added, separated by a ","
explorer.get('/address/txns/:addr', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/address/txs/'+ req.params.addr, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /address/unspent/:addr - Gets unspent data about transactions by address
// Multiple addresses can be added, separated by a ","
explorer.get('/address/unspent/:addr', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/address/unspent/'+ req.params.addr, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

// /address/unspent/:addr/:options? - Gets unspent data about transactions by address filter confirmations
// Multiple addresses can be added, separated by a ","
// unspent with a certain amount of confirmations
explorer.get('/address/unspent/:addr/:options?', function (req, res) {
	getJson('http://btc.blockr.io/api/v1/address/unspent/'+ req.params.addr + req.params.options, function(err, response) {
		if (err) return res.send(err);
		res.json( response )
	});
});

module.exports = explorer;