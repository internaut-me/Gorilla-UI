/**
 *  scripts/controllers/mainController.js
 *
 *  A controller for the main menus and bars
 *  Will load and loop every minute to update
 */

angular.module('guerilla').controller(
    'mainController', 
    function( $scope, $http, $q ) {
        // create the scope object
        $scope.info = [];
        $scope.stats = [];

        /*
         *  Main function to load data for the home page
         *  $scope, $http, $q
         */
        loading();
        var loop = setInterval(loading, 60000);

        // external ip
        function loading() {
            $scope.info.loaded = false;
            $scope.counter = 0;

            $http.get('http://192.168.0.160:8444/api/ip')
            .then(function (response) {
                $scope.info.ip = response.data.external_ip;
                $scope.counter = $scope.counter + 1;
            });

            // time since the server has been live
            $http.get('http://192.168.0.160:8444/api/livesince')
                .then(function (response) {
                    var miniRunning = Date.now() - response.data.livesince;
                    var day   = 86400000;
                    if (miniRunning < day*365) {

                        if (miniRunning < day) {
                            $scope.info.livesince = '< 1 day';
                        } else {
                            var time = Math.round(miniRunning/day);
                            $scope.info.livesince = time +' days';
                        }
                    }
                    $scope.counter = $scope.counter + 1;
                });

            // info of the Mini's bitcoin instance
            $http.get('http://192.168.0.160:8444/api/getinfo')
                .then(function (response) {
                    $scope.info.peers = response.data.connections;
                    $scope.info.difficulty = Math.round(response.data.difficulty);
                    $scope.info.protocolversion = response.data.protocolversion;
                    $scope.info.miniblock = response.data.blocks;
                    $scope.counter = $scope.counter + 1;
                });

            // GET block the network is on
            $http.get('http://192.168.0.160:8444/api/externalblock')
                .then(function (response) {
                    $scope.info.blocksbehind = response.data.networkblock - $scope.info.miniblock;
                    $scope.counter = $scope.counter + 1;
                });  

            // Bitcoin price via theindex
            $http.get('http://theindex.io/api/btc/index.php')
                .then(function (response) {
                    $scope.stats.index = response.data;
                    $scope.counter = $scope.counter + 1;
                });

            // getting network stats from external source
            $http.get('http://192.168.0.160:8444/api/networkstats')
                .then(function (response) {
                    $scope.stats.txns = response.data.n_tx;
                    $scope.stats.blockmins = (response.data.minutes_between_blocks).toFixed(2);
                    $scope.stats.hashrate = Math.round(response.data.hash_rate);
                    $scope.stats.timestamp = response.data.timestamp;

                    $scope.counter = $scope.counter + 1;
                });

            if($scope.counter = 6) {
                $scope.info.loaded = true;
            }
            console.log('looping');
        }
});