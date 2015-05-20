var app = angular.module("admin-directives", []);

app.controller('adminUserController', ['$scope', '$http', function ($scope, $http) {
	$scope.userlist = [];
	$scope.selectedUser = {};

	$scope.refresh = function () {
		$http.get('http://localhost:8090/administration/users').success(function (data, status, headers, config) {
			$scope.userlist = data;
		});
	};

	$scope.refresh();
}]);

app.directive('adminUserList', function () {
	return {
		restrict: 'E',
		templateUrl: 'views/admin/userlist.html',
		controller: ['$scope', '$http', function ($scope, $http) {
			$scope.users = [];
			$scope.refresh = function () {
				$http.get('http://localhost:8090/administration/users').success(function (data, status, headers, config) {
					$scope.users = data;
				});
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
		controller: ['$scope', '$http', function ($scope, $http) {
			$scope.username = '';
			$scope.userpass = '';
			$scope.alertIsVisible = false;
			$scope.errorAlertIsVisible = false;
			$scope.pending = false;

			$scope.submit = function () {
				$scope.pending = true;
				if ($scope.username && $scope.userpass) {
					$http.post('http://localhost:8090/administration/users', { name: $scope.username, password: $scope.userpass }).success(function (data, status, headers, config) {
						$scope.pending = false;

						if (data.type) {
							$scope.username = '';
							$scope.userpass = '';
							$scope.alertIsVisible = true;
						} else {
							$scope.errorAlertIsVisible = true;
						}
					});
				}
			};

			$scope.reset = function () {
				$scope.username = '';
				$scope.userpass = '';
			};
		}],
		controllerAs: 'sub'
	};
});
