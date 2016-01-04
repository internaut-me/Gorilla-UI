#!/usr/bin/env node

/*!
 * gorilla-ui
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */

'use strict';

//================================= MODULE DEPENDENCIES ==
var config = require('../../config');
var internalIp = require('internal-ip');
var nodemailer = require('nodemailer');
var directTransport = require('nodemailer-direct-transport');

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
	var emailAddressTo = config.email.address;

	transporter.sendMail ( {
		from: emailAddressFrom,
		to: emailAddressTo,
		subject: 'Mini IP address',
		text: "Your Mini is running",
		html: '<h3><b>Welcom to the Mini family.</b></h3><p>Your Mini can be accessed at <a href="http://'+miniip+':'+config.system.PORT+'">'+miniip+':'+config.system.PORT+'</a></p><p>It is available on your local network only.</p><p>If you have questions email us at support@bitcoinmini.com or ask a question on reddit in r/bitcoinmini.</p>'
	});
}
