/**
 *  scripts/controllers/configController.js
 *
 *  A controller for viewing and updating config
 *  
 */
'use strict';

angular.module('guerilla').controller(
    'configController', 
    function( $scope, $http, $q ) {

    	$scope.config = [];

    	$http.get('http://192.168.0.160:8444/admin')
            .then(function (response) {

                $scope.config = response.data;
            });


        //$scope.$emit('CONFIG');

    });

