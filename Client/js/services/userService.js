var app = angular.module('userServiceModule', []);

app.service('userService', function($http, $q) {
    var _userList = [];

    this.userList = function() {
        return [].concat(_userList);
    };

    this.addUser = function(userObject) {
        return $http.post('http://localhost:8090/administration/users', userObject).then(function (response) {
            return response.data;
        }, function(response) {
            return $q.reject(response.data);
        });
    };

    this.allUser = function() {
        return $http.get('http://localhost:8090/administration/users').then(function (response) {
            _userList = response.data;
            return _userList;
		}, function(response) {
            return $q.reject(response.data);
        });
    };

    this.getUser = function(id) {
        return $http.get('http://localhost:8090/administration/users/' + id).then(function (response) {
            return response.data;
		}, function(response) {
            return $q.reject(response.data);
        });
    };

    this.deleteUser = function(id) {
        return $http.delete('http://localhost:8090/administration/users/' + id).then(function(response) {
            return response.data;
        }, function(response) {
            return $q.reject(response.data);
        });
    };
});
