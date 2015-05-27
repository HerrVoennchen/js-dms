var app = angular.module('admin-directives', ['userServiceModule']);

app.controller('userListController', function ($scope, userService) {
	$scope.users = [];
	$scope.refresh = function () {
		userService.allUser().then(function(data){
			$scope.users = data;
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
