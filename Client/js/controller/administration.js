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
	$scope.isNewUser = true;
	$scope.userObj = { name: '', password: '', email: '' };
	userService.getUser($routeParams.id).then(function(data){

		if(data) {
			$scope.userObj = data;
			$scope.isNewUser = false;
			$scope.caption = 'Edit User';
		}

		$scope.alertIsVisible = false;
		$scope.errorAlertIsVisible = false;
		$scope.pending = false;
	});

	$scope.submit = function () {
		$scope.pending = true;
		if ($scope.userObj.name && $scope.userObj.password && $scope.userObj.email) {
			var resultPromise = null;

			if($scope.isNewUser) {
				resultPromise = userService.addUser($scope.userObj);
			} else {
				resultPromise = userService.updateUser($scope.userObj);
			}

			resultPromise.then(function(data) {
				$scope.pending = false;

				if (data.type) {
					$scope.userObj = { name: '', password: '', email: '' };
					$scope.alertIsVisible = true;
				} else {
					$scope.errorAlertIsVisible = true;
				}
			});
		}
	};

	$scope.reset = function () {
		$scope.userObj = { name: '', password: '', email: '' };
	};
});
