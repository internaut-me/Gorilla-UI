#!/usr/bin/env node

/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

/*================================= MODULE DEPENDENCIES ==*/

var internalIp = require('internal-ip');
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');

var config = require('../../config.tmp.json');

/**
 * Send an email to the Mini owner with the internal ip address
 * This removes the need to log into your home router
 */
module.exports = function ipEmail() {
	// Get the Mini's internal ip address behind the router firewall and NAT
	var miniip = internalIp.v4();

	// Create the email using the email from purchase
	var transporter = nodemailer.createTransport();

	var emailAddressFrom = "support@bitcoinmini.com";
	var emailAddressTo = config.user.admin.email;

	transporter.sendMail ( {
		from: emailAddressFrom,
		to: emailAddressTo,
		subject: 'Mini IP address',
		text: "This is an email test.",
		html: '<h3><b>Thank you.</b></h3><p>We are honored that you have chosen the Bitcoin Mini for your full node.</p><p>Your Mini interface is available in any browser on your local network at ' + miniip + '</p><p>If you have questions email us at support@bitcoinmini.com or ask a question on reddit in r/bitcoinmini.</p>'
	});
}
