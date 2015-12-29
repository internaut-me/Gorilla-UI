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

        // create the scope array that we will put all our information
        $scope.info = [];
        // show LOADING to the user
        $scope.loader = true;
        $scope.info.loaded = false;
        // don't show the update button before the check is made
        $scope.needsUpdate = false;

        // call the main function
        loader();
        // set an interval to call the function regularly while the webpage is actively open
        var loop = setInterval( loader, 300000 ); // every 5 minutes

        // call the function to check for available updates
        updates();
        // set an interval to call the function regularly while the webpage is actively open
        // it will not check for updates if the page is not open
        var checkUpdate = setInterval(updates, 86400000); // every day

        /**
         *  Loader
         *
         *  STEVE TODO
         */
        function loader() {
            // show "LOADING" to the user instead of ONLINE
            $scope.info.loaded = false;

            // build array of get requests from our APIs
            $q.all([
                $http.get('http://'+ window.location.host +'/api/ip'),
                $http.get('http://'+ window.location.host +'/api/livesince'),
                $http.get('http://'+ window.location.host +'/api/getinfo'),
                $http.get('http://'+ window.location.host +'/api/networkstats'),
                $http.get('http://'+ window.location.host +'/api/externalblock'),
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
                // external ip
                $scope.info.ip = data[0].external_ip;
                // uptime
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
                // Wire up the display of the data
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
                
                // display the "ONLINE" message
                $scope.info.loaded = true;

                if($scope.info.loaded){
                    setTimeout(function(){
                        $scope.loader = false;
                    }, 2000);
                }
            });


        }

        /**
         *  Updates
         *
         *  STEVE TODO
         */
        function updates() {
            // call our API
            $http.get('http://'+ window.location.host +'/admin/update')
            .then(function (response) {
                // the needsUpdate variable is bound to the DOM by an ngIf
                // The update button will appear if there is an update needed
                $scope.needsUpdate = response.data.needsUpdate;
                $scope.updateVersion = response.data.version;
            });
        }

        /**
         *  Shutdown
         *
         *  Use this to avoid damage to bitcoind, and enable a bootup process that is fast.
         *  STEVE TODO: finish the comment if needing more info
         */
        $scope.shutdown = function() {
            // before shutdown, let's display a little loading div
            $scope.systemProcess = true;
            $scope.systemMessage = 'shutting down';
            // use our API to shutdown with a small delay
            setInterval(function() {
                $http.get('http://'+ window.location.host +'/api/system/shutdown');
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
            $scope.systemMessage = 'restarting';
            $scope.systemDetails = 'Do not close your browser window! Your browser will refresh when your Mini is back online.'

            // use our API to restart
            $http.get('http://'+ window.location.host +'/api/system/restart');

            setInterval(checkIfRunning, 5000);

            // Check if the mini is back
            function checkIfRunning() {
                $http.get('http://'+ window.location.host +'/api/system/running')
                    // if successful call the .then
                    .then(function (response) {

                        // Tell the user the Mini is done, and reloading
                        $scope.systemMessage = 'All done!'
                        $scope.systemDetails = 'Refreshing...'

                        // delay 2 secs so they can see the message
                        setInterval(function() {
                            // ui-router uses $state so reload it
                            window.location.reload();
                        }, 2000);
                    // if unsucessful call the following and loop every 10 secs
                    }, function (response) {
                        if(!response) {
                            console.log('not ready');
                            setInterval(checkIfRunning, 5000);
                        }
                    });
            }
        }

        // $scope.$on('CONFIG', function() { $scope.STATSMENU = true; });
        // $scope.$on('HOME', function() { $scope.STATSMENU = false; });
        
        console.log('We have bug and development bounties available. If you find a bug, create a pull request on our the dev repo @ github.com/ansellindner/guerilla. Bounties will be UP TO 0.1 btc for now based on how big it is, and we will increase that as we can. A list of wanted development bounties will soon be available on our subreddit r/bitcoinmini. Decentralize all the things.');
});