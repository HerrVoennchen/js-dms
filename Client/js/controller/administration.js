var app = angular.module('admin-directives', ['userServiceModule']);

app.controller('userListController', function ($scope, userService) {
	$scope.users = [];
	$scope.refresh = function () {
		userService.allUser().then(function(data){
			$scope.users = data;
		});
	};

	$scope.deleteUser = function(id, name) {
		BootstrapDialog.confirm({
            title: 'WARNING',
            message: 'Are you sure you want to delete "' + name + '" ?',
            type: BootstrapDialog.TYPE_DANGER, // <-- Default value is BootstrapDialog.TYPE_PRIMARY
            closable: true, // <-- Default value is false
            draggable: true, // <-- Default value is false
            btnCancelLabel: 'Cancel', // <-- Default value is 'Cancel',
            btnOKLabel: 'Delete', // <-- Default value is 'OK',
            btnOKClass: 'btn-danger', // <-- If you didn't specify it, dialog type will be used,
            callback: function(result) {
                // result will be true if button was click, while it will be false if users close the dialog directly.
                if(result) {
					userService.deleteUser(id).then(function(data){
						$scope.refresh();
					});
                }
            }
        });
	};

	$scope.refresh();
});

app.controller('userDetailsController', function($scope, $routeParams, userService) {
	$scope.caption = "Add a new User";
	var tmpUser = {};
	userService.getUser($routeParams.id).then(function(data){
		tmpUser = data;

		if(tmpUser) {
			$scope.username = tmpUser.name || '';
			$scope.userpass = tmpUser.password || '';
			$scope.caption = "Edit existing User";
		} else {
			$scope.username = '';//userService._selectedUser.username || '';
			$scope.userpass = '';//userService._selectedUser.password || '';
		}
		$scope.alertIsVisible = false;
		$scope.errorAlertIsVisible = false;
		$scope.pending = false;
	});

	$scope.submit = function () {
		$scope.pending = true;
		if ($scope.username && $scope.userpass) {
		/*	userService.addUser()
				$scope.pending = false;

				if (data.type) {
					$scope.username = '';
					$scope.userpass = '';
					$scope.alertIsVisible = true;
				} else {
					$scope.errorAlertIsVisible = true;
				}
			});*/
		}
	};

	$scope.reset = function () {
		$scope.username = tmpUser.name;
		$scope.userpass = tmpUser.password;
		//$scope.username = '';
		//$scope.userpass = '';
	};
});
