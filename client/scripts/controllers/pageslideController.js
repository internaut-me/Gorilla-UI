/**
 *  scripts/controllers/pageslideController.js
 *
 *  A controller for the page slide menu
 *	The menu will concentrate on settings and so forth
 */
'use strict';

angular.module('guerilla').controller(
	'pageslideController', 
	function ($scope) {
		$scope.checked = false; // This will be binded using the ps-open attribute
        $scope.toggle = function(){
            $scope.checked = !$scope.checked
        }
	});