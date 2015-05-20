var app = angular.module("admin-directives", ['userServiceModule']);

app.directive('adminUserList', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/admin/userlist.html',
		controller: ['$scope', 'userService', function ($scope, userService) {
			$scope.users = [];
			$scope.refresh = function () {
				userService.allUser().then(function(data){
					$scope.users = data;
				});
			};

			$scope.setUser = function(userId) {
				var tmpUser = {};
				for(index in $scope.users) {
					var usr = $scope.users[index];
					if(usr.id === userId) {
						tmpUser = usr;
					}
				}

				userService._selectedUser = tmpUser;
			};

			$scope.refresh();
		}],
		controllerAs: 'userList'
	};
});

app.directive('adminNewUser', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/admin/newuser.html',
		controller: ['$scope', 'userService', function ($scope, userService) {
			if(userService._selectedUser) {
				$scope.username = userService._selectedUser.username || '';
				$scope.userpass = userService._selectedUser.password || '';
			} else {
				$scope.username = '';//userService._selectedUser.username || '';
				$scope.userpass = '';//userService._selectedUser.password || '';
			}
			$scope.alertIsVisible = false;
			$scope.errorAlertIsVisible = false;
			$scope.pending = false;

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
				$scope.username = userService._selectedUser.username;
				$scope.userpass = userService._selectedUser.password;
				//$scope.username = '';
				//$scope.userpass = '';
			};
		}],
		controllerAs: 'sub'
	};
});
