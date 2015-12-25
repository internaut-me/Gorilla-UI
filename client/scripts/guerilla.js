/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */


var guerilla = angular.module('guerilla', ['pageslide-directive', 'ui.router'])

// Some routing configuration
// This should effect the ng-view div
.config(function($stateProvider, $urlRouterProvider) {
   
	// For any unmatched url, redirect to /state1 
	$urlRouterProvider.otherwise("/home");
	// 
	// Now set up the states 
	$stateProvider
	.state('home', {
	  	url: "/home",
	  	templateUrl: "partials/home.html"
	})
	.state('config', {
	  	url: "/config",
	  	templateUrl: "partials/config.html",
	  	controller: "configController"
	})
	.state('config.editemail', {
	  	url: "/email",
	  	templateUrl: "partials/configPages/config.email.html",
	  	controller: "configController"
	})
	.state('config.editport', {
	  	url: "/port",
	  	templateUrl: "partials/configPages/config.port.html",
	  	controller: "configController"
	})
	.state('config.editbtcname', {
	  	url: "/editbtcname",
	  	templateUrl: "partials/configPages/config.btcname.html",
	  	controller: "configController"
	})
	.state('config.editbtcpass', {
	  	url: "/editbtcpass",
	  	templateUrl: "partials/configPages/config.btcpass.html",
	  	controller: "configController"
	})
	.state('config.timeout', {
	  	url: "/timeout",
	  	templateUrl: "partials/configPages/config.timeout.html",
	  	controller: "configController"
	})
	.state('settings', {
	  	url: "/settings",
	  	templateUrl: "partials/settings.html",
	  	controller: "settingsController"
	})
});

// TODO add some configuration