/**
 *  scripts/controllers/homeController.js
 *
 *  A controller for the ui-view on the home screen
 *  
 */
'use strict';

angular.module('guerilla')
.controller(
    'homeController', 
    function( $scope, $rootScope ) {

    	$scope.home = 'This is the home controller.';

        var bitfinex = [];
        $scope.data;
        $scope.data2 = [];


        var bitfinex = new WebSocket('wss://api2.bitfinex.com:3000/ws');
        bitfinex.onopen = function(){
            bitfinex.send(JSON.stringify({
                "event": "subscribe",
                "channel": "ticker",
                "pair": "BTCUSD"
            }));
        }
        bitfinex.onmessage = function(msg) {

            $rootScope.$apply(function() {
                bitfinex = JSON.parse(msg.data);
                //console.log(bitfinex);

                if(bitfinex.length > 2) {
                    $scope.data = bitfinex[7].toFixed(2);
                }
            });

            $scope.data2.push($scope.data);


            
        };
        bitfinex.onclose = function() {
            console.log('Connection is closed');
        }

    })
.factory('bitfinex', function($websocket) {
    // Open a WebSocket connection
    var bitfinex = $websocket('wss://api2.bitfinex.com:3000/ws');

    var collection = [];

    

    bitfinex.onMessage(function(message) {
        collection.push(JSON.parse(message.data));
    });

    var methods = {
        collection: collection,
        get: function() {
            bitfinex.send(JSON.stringify({ action: 'get' }));
        }
    };

        return methods;
    });

