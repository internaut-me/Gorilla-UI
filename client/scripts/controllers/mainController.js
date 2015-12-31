/**
 *  scripts/controllers/mainController.js
 *
 *  A controller for the main menus and power
 *  Loops include: 
 *      checking Mini stats every 5 mins,
 *      checking for updates every day,
 *      restart loops every 5 secs when restarting
 */
'use strict';

angular.module('guerilla').controller(
    'mainController', 
    function( $scope, $http, $q ) {

        /**
         *  Variables
         */
        $scope.info = [];  // for the menu information
        // variable for DOM manipulation
        $scope.loader = true;  // show the loading div
        $scope.info.loaded = false;  // For showing the ONLINE vs LOADING
        $scope.needsUpdate = false;  // For showing the update button

        // call the main function and set interval to 5 mins
        loader();
        var loop = setInterval( loader, 300000 );

        // call the function to check for available updates and set interval to 1 day
        // TODO this will only change if the server is restarted. Must have api route to check it.
        updates();
        var checkUpdate = setInterval(updates, 86400000);

        /**
         *  Loader
         *
         *  TODO Comment
         */
        function loader() {
            // Reset to false to show the little LOADING...
            $scope.info.loaded = false;

            // build array of get requests from our APIs
            $q.all([
                $http.get('http://'+ window.location.host +'/api/ip'),
                $http.get('http://'+ window.location.host +'/api/livesince'),
                $http.get('http://'+ window.location.host +'/api/getinfo'),
                $http.get('http://'+ window.location.host +'/api/networkstats'),
                $http.get('http://'+ window.location.host +'/api/externalblock'),
                // TODO make an API route that calls this so everything is API calls
                $http.get('http://theindex.io/api/btc/index.php')
            ])

            // do this after all the get requests are completed
            .then(function( results ) {

                // create an empty array for the results
                var data = [];

                // add all results to the array one at a time
                angular.forEach( results, function( result ) {
                    data = data.concat( result.data );
                });

                // Now let's set some variables to push info to the DOM
                $scope.info.ip = data[0].external_ip;
                // The different numbers (ie data[2]) correspond to the different get requests
                $scope.info.peers = data[2].connections;
                $scope.info.difficulty = Math.round(data[2].difficulty);
                $scope.info.protocolversion = data[2].protocolversion;
                $scope.info.miniblock = data[2].blocks;

                $scope.info.txns = data[3].stats.transaction_count;
                $scope.info.blockmins = parseInt(data[3].stats.block_interval_min).toFixed(2);
                $scope.info.hashrate = Math.round(data[3].stats.hash_rate_gh);
                $scope.info.timestamp = data[3].stats.to;

                $scope.info.blocksbehind = (data[4].totals.block_count - $scope.info.miniblock) + ' Blocks';

                $scope.info.index = data[5];
                
                // Uptime needs a little math
                var miniRunning = Date.now() - data[1].livesince;
                var day   = 86400000;
                if (miniRunning < day*365) {

                    if (miniRunning < day) {
                        $scope.info.livesince = '< 1 day';
                    } else {
                        var time = Math.round(miniRunning/day);
                        $scope.info.livesince = time +' days';
                    }
                }
                
                // display the ONLINE
                $scope.info.loaded = true;

                // On the initial load, delay the loading div from disappearing
                if($scope.info.loaded){
                    setTimeout(function(){
                        $scope.loader = false;
                    }, 2000);
                }
            }); // .then()
        } // loader()

        /**
         *  Updates
         *
         *  TODO Comments
         */
        function updates() {
            // check if it's needed
            $http.get('http://'+ window.location.host +'/admin/update')
            .then(function (response) {
                // The update button will appear if there is an update needed
                $scope.needsUpdate = response.data.needsUpdate;
                $scope.updateVersion = response.data.version;
            });
        }

        /**
         *  Shutdown
         *
         *  Use this to avoid damage to bitcoind, and enable a bootup process that is fast.
         *  TODO finish the comment if needing more info
         */
        $scope.shutdown = function() {
            // before shutdown, let's display a little loading div
            $scope.systemProcess = true;
            $scope.systemMessage = 'Your Mini is shutting down...';
            // use our API to shutdown with a small delay
            setTimeout(function() {
                $http.get('http://'+ window.location.host +'/admin/system/shutdown');
                $scope.systemDetails = 'Your Mini can now be unplugged safely.';
            }, 5000);
        }

        /**
         *  Reboot
         *
         *  Since Angular runs in the client, we can use it to monitor restarts.
         *  Here we display a restarting div, check for the server to be started, and then reload.
         */
        $scope.restart = function() {
            // before restarting, let's display a little loading div
            $scope.systemProcess = true;
            $scope.systemMessage = 'Your Mini is restarting...';
            $scope.systemDetails = 'Do not close your browser window! Your browser will refresh when your Mini is back online.'

            // use our API to restart
            $http.get('http://'+ window.location.host +'/admin/system/restart');

            setInterval(checkIfRunning, 5000);

            // Check if the mini is back
            function checkIfRunning() {
                $http.get('http://'+ window.location.host +'/api')
                    // if successful call the .then
                    .then(function (response) {

                        // Tell the user the Mini is done, and reloading
                        $scope.systemMessage = 'All done!'
                        $scope.systemDetails = 'Refreshing...'

                        // delay 2 secs so they can see the message
                        setInterval(function() {
                            // refresh the current window
                            window.location.reload();
                        }, 2000);
                    // if unsucessful call the following and loop every 10 secs
                    }, function (response) {
                        if(!response) {
                            console.log('not ready');
                        }
                    });
            }
        }

        /**
         *  Update
         *
         *  Since Angular runs in the client, we can use it to monitor restarts.
         *  Here we display a restarting div, check for the server to be started, and then reload.
         */
        $scope.updateNow = function() {
            // before restarting, let's display a little loading div
            $scope.systemProcess = true;
            $scope.systemMessage = 'updating';
            $scope.systemDetails = 'Do not close your browser window.'

            // use our API to restart
            $http.get('http://'+ window.location.host +'/admin/system/update');

            setInterval(checkIfDone, 10000);

            // Check if the mini is back
            function checkIfDone() {
                $http.get('http://'+ window.location.host +'/api')
                    // if successful call the .then
                    .then(function (response) {

                        // Tell the user the Mini is done, and reloading
                        $scope.systemMessage = 'All done!'
                        $scope.systemDetails = 'Refreshing...'

                        // delay 2 secs so they can see the message
                        setInterval(function() {
                            // refresh the current window
                            window.location.reload();
                        }, 2000);
                    // if unsucessful call the following and loop every 10 secs
                    }, function (response) {
                        if(!response) {
                            console.log('not ready');
                        }
                    });
            }
        }

        // $scope.$on('CONFIG', function() { $scope.STATSMENU = true; });
        // $scope.$on('HOME', function() { $scope.STATSMENU = false; });
        
        console.log('We have bug and development bounties available. If you find a bug, create a pull request on our the dev repo @ github.com/ansellindner/guerilla. Bounties will be UP TO 0.1 btc for now based on how big it is, and we will increase that as we can. A list of wanted development bounties will soon be available on our subreddit r/bitcoinmini. Decentralize all the things.');
});