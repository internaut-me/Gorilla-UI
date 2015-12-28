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

    	$http.get('http://'+ window.location.host +'/admin')
            .then(function (response) {

                $scope.config = response.data;
            });


        //$scope.$emit('CONFIG');

    });

