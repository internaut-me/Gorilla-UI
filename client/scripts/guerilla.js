/*!
 * guerilla-mini
 * Copyright(c) 2015 Mini Computing, LLC
 * MIT Licensed
 */
'use strict';

var guerilla = angular.module('guerilla', ['pageslide-directive', 'ui.router', 'ngWebSocket'])

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
	  	templateUrl: "partials/home.html",
	  	controller: "homeController"
	})
	.state('config', {
	  	url: "/config",
	  	templateUrl: "partials/config.html",
	  	controller: "configController"
	})
	.state('settings', {
	  	url: "/settings",
	  	templateUrl: "partials/settings.html",
	  	controller: "settingsController"
	})
});

// TODO add some configuration