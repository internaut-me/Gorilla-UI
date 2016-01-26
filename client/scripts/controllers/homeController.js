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
    function( $scope, $rootScope, $http ) {
    	$http.get('http://'+ window.location.host +':8334/api/netstat').then(function(response){
    		$scope.home.netup = response.rx;
    	});
    	// BitFinex websocket
        ////////////////////////////////////////////////////////////////
        var bitfinex = [];
        $scope.btfx  = [];

        // Start bitfinex websocket
        var bitfinex = new WebSocket('wss://api2.bitfinex.com:3000/ws');
        // Open the connection and pass the needed request
        // Learn More http://docs.bitfinex.com/#websocket
        bitfinex.onopen = function(){
            bitfinex.send(JSON.stringify({
                "event": "subscribe",
                "channel": "ticker",
                "pair": "BTCUSD"
            }));
        }
        // Upon recieving a new message
        bitfinex.onmessage = function(msg) {

            // websockets come through the rootscope of the DOM
            $rootScope.$apply(function() {
                bitfinex = JSON.parse(msg.data);

                // This filters out the "hb" messages
                if(bitfinex.length > 2) {
                    $scope.btfx.chg   = bitfinex[5].toFixed(2);
                    $scope.btfx.pct   = bitfinex[6]*100;
                    $scope.btfx.price = bitfinex[7].toFixed(2);
                    $scope.btfx.vol   = bitfinex[8].toFixed(0);
                    // for coloring text
                    // assume price went up
                    $scope.btfx.up = true;
                    if($scope.btfx.chg < 0) $scope.btfx.up = false;
                }
            });
        };
        // To close the connection, we don't use this really
        bitfinex.onclose = function() { console.log('Bitfinex connection is closed'); }
        /////////////////////////////////////////////////////////////////

        // OKCoin Websocket
        ////////////////////////////////////////////////////////////////
        // var okcoin = [];
        // $scope.okcn  = [];

        // // Start okcoin websocket
        // var okcoin = new WebSocket('wss://real.okcoin.com:10440/websocket/okcoinapi');
        // // Open the connection and pass the needed request
        // okcoin.onopen = function(){
        //     okcoin.send(JSON.stringify({
        //         'event':'addChannel',
        //         'channel':'ok_btcusd_ticker'
        //     }));
        // }
        // // Upon recieving a new message
        // okcoin.onmessage = function(msg) {

        //     // websockets come through the rootscope of the DOM
        //     $rootScope.$apply(function() {

        //         okcoin = msg.data;

        //         $scope.okcn.high  = okcoin.data.high;
        //         $scope.okcn.low   = okcoin.data.low;
        //         $scope.okcn.price = okcoin.data.last;
        //         $scope.okcn.vol   = okcoin.data.vol.toFixed(0);
        //     });
        // };
        // // To close the connection, we don't use this really
        // okcoin.onclose = function() { console.log('OKCoin connection is closed'); }
        /////////////////////////////////////////////////////////////////


        // Coinbase Websocket
        ////////////////////////////////////////////////////////////////
        var coinbase = [];
        $scope.cnbs  = [];

        // Start coinbase websocket
        // var coinbase = new WebSocket('wss://ws-feed.exchange.coinbase.com');
        // // Open the connection and pass the needed request
        // coinbase.onopen = function(){
        //     coinbase.send(JSON.stringify({
        //         "type": "subscribe",
        //         "product_id": "BTC-USD"
        //     }));
        // }
        // // Upon recieving a new message
        // coinbase.onmessage = function(msg) {
        //     //console.log(msg.data[0]);

        //     // // websockets come through the rootscope of the DOM
        //     $rootScope.$apply(function() {

        //         coinbase = JSON.parse(msg.data);
        //         console.log(msg.data.type);

        //         if(coinbase[0] == "match") {
        //             //console.log(coinbase[5]);
        //             $scope.cnbs.price = coinbase.price;
        //         }

        //     //     $scope.cnbs.chg   = coinbase.data.last.toFixed(2);
        //     //     $scope.cnbs.pct   = coinbase[6]*100;
                
        //     //     $scope.cnbs.vol   = coinbase[8].toFixed(0);
        //     });
        // };
        // // To close the connection, we don't use this really
        // coinbase.onclose = function() { console.log('Coinbase connection is closed'); }
        /////////////////////////////////////////////////////////////////

    });

