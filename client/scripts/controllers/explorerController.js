/**
 *  scripts/controllers/explorerController.js
 *
 *  A controller for viewing block explorer
 *  
 */
'use strict';

angular.module('guerilla').controller(
    'explorerController', 
    function( $scope, $http ) {

    	// $scope.config = [];
    	// $scope.notifications = [];
    	// $scope.saving = [];

    	explorerLoad();

    	function explorerLoad() {
    		$http.get('http://'+ window.location.host +'/explorer/coininfo')
            .then(function (response) {

                $scope.explorer = response.data.data;

                $scope.explorer.last_block.difficulty = Math.round($scope.explorer.last_block.difficulty);
            });
    	}
    	

    //     $scope.editEmail = function () {
    //     	$scope.saving.email = true;
    //     	var newEmail = $scope.edit.email;
    //     	$http.get('http://'+ window.location.host +'/admin/edit/email/'+newEmail)
    //         .then(function () {
				// $scope.saving.email = false;
				// configLoad();
    //         });
    //     }

    //     $scope.emailNotifications = function () {

    //     	if($scope.notifications.email == 'checked') {
    //     		$scope.saving.emailNotification = true;
    //     		$http.get('http://'+ window.location.host +'/admin/edit/email/notifications/disable')
	   //      		.then(function () {
	   //      			$scope.notifications.email == '';
	   //      			$scope.saving.emailNotification = false;
	   //      			configLoad();
	   //          	});
    //     	}
    //     	if($scope.notifications.email == '') {
    //     		$scope.saving.emailNotification = true;
    //     		$http.get('http://'+ window.location.host +'/admin/edit/email/notifications/enable')
	   //      		.then(function () {
	   //      			$scope.notifications.email == 'checked';
	   //      			$scope.saving.emailNotification = false;
	   //      			configLoad();
	   //          	});
    //     	}
           
    //     }

    //     $scope.editTimeout = function () {
    //         $scope.saving.timeout = true;
    //         var newTimeout = $scope.edit.timeout;
    //         $http.get('http://'+ window.location.host +'/admin/edit/timeout/'+newTimeout)
    //         .then(function () {
    //             $scope.saving.timeout = false;
    //             configLoad();
    //         });
    //     }

    });

