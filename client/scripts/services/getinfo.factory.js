/**
 *  scripts/controllers/configController.js
 *
 *  A controller for viewing and updating config
 *  
 */

angular.module('guerilla').factory(
    'getInfoFactory', 
	function ($http, $q){
  		return {
		    getInfo: function (){
				//$q.all will wait for an array of promises to resolve,
				// then will resolve it's own promise (which it returns)
				// with an array of results in the same order.
				return $q.all([
					$http.get('http://192.168.0.160:8444/api/ip'),
					$http.get('http://192.168.0.160:8444/api/livesince'),
					$http.get('http://192.168.0.160:8444/api/getinfo'),
					$http.get('http://192.168.0.160:8444/api/networkstats'),
					$http.get('http://theindex.io/api/btc/index.php')
				])

				//process all of the results from the two promises 
				// above, and join them together into a single result.
				// since then() returns a promise that resolves ot the
				// return value of it's callback, this is all we need 
				// to return from our service method.
				.then(function(results) {
					var data = {};
			        angular.forEach(results, function(result) {

			        	data = data.concat(result.data);
			        });
			        console.log(data.external_ip);
			        //$scope.info.ip = data.external_ip;
			        return data;
			    });
			}
		};
	}
);