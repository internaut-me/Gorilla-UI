/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

//================================= MODULE DEPENDENCIES ==
var express = require('express');
var bitcoin = require('bitcoin');
var getJson = require('get-json');
var exec = require('child_process').exec;

// begin new express router instance
var api = express.Router();
// set authentication for bitcoind
var client = new bitcoin.Client({
	host:'localhost',
	port:8332,
	user:'bitcoinrpc',
	pass:global.rpcPassword,
	timeout:30000
});

//================================= MIDDLEWARE ==
// TODO: logging, maybe caching

//================================= CORS ========
api.all('/', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "X-Requested-With");
	  next();
 });

//================================= API ROUTES ==
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
	// /api/livesince
	res.status(200).json({livesince: global.liveSince})
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

api.get('/netstat', function(req, res) {
    exec("vnstat -m --json", function (error, stdout, stderr) {
    	var otemp = JSON.parse(stdout);
    	res.send(otemp['interfaces']);
    });
});

api.get('/storage', function(req, res) {
        exec("df -h /dev/sda1", function (error, stdout, stderr) {
        	var c = 1;
        	var temp = stdout.slice(60);
        	var out = {};
        	temp = temp.trim();
        	temp = temp.split(" ");
        	//var out = {'total': temp[0],'used': temp[2], 'available': temp[4]};
        	for (var i = 0; i < temp.length; i++) { 
        	    if(temp[i] == ""){
        	    	
        	    }else{
        	    	switch(c) {
        	        case 1:
        	            out['total'] = temp[i];
        	            c++;
        	            break;
        	        case 2:
        	        	out['used'] =  temp[i];
        	        	c++;
        	            break;
        	        case 3:
        	        	out['free'] = temp[i];
        	        	c++;
        	            break;
        	        case 4:
        	        	out['percentfree'] = temp[i];
        	        	c++;
        	            break;
        	        default:
        	            break;
        	    }
        	    }
        	}
		res.json(out);
	});
});

api.get('/meminfo', function(req, res) {
    exec("cat /proc/meminfo", function (error, stdout, stderr) {
    		var temp = stdout.split("\n");
    		var total = temp[0].split(" ");
    		var tot = [];
    		for (var i = 0; i < total.length; i++) { 
        	    if(total[i] == ""){
        	    	
        	    }else{
        	    	tot.push(total[i]);
        	    }
    		}
    		var free = temp[1].split(" ");
    		var fr = [];
    		for (var i = 0; i < free.length; i++) { 
        	    if(free[i] == ""){
        	    	
        	    }else{
        	    	fr.push(free[i]);
        	    }
    		}
    		var out = {'total': parseFloat(tot[1]), 'free': parseFloat(fr[1])};
            res.send(out);
    });
});


api.get('/btcsize', function(req, res) {
        exec("du -hs ~/.bitcoin/", function (error, stdout, stderr) {
		var temp = stdout.slice(0,4);
		res.json(temp.trim());
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
