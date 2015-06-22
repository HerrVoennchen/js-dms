
var app = angular.module('jsdms-client', ['ngRoute', 'admin-directives']);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/admin/users', {
		templateUrl: 'views/admin/userList.html',
		controller: 'userListController'
	}).when('/admin/users/add/:id', {
		templateUrl: 'views/admin/newUser.html',
		controller: 'userDetailsController'
	}).when('/admin/users/add', {
		templateUrl: 'views/admin/newUser.html',
		controller: 'userDetailsController'
	}).when('/search', {
		templateUrl: 'views/search/searchDocs.html',
		controller: 'searchDocsController'
	}).when('/search/new', {
		templateUrl: 'views/search/newDocument.html',
		controller: 'newDocumentController'
	}).otherwise({
		redirectTo: '/'
	});
}]);

app.controller('tabController', function () {
	this.tab = 0;

	this.isSet = function (checkTab) {
		return this.tab === checkTab;
	};

	this.setTab = function (activeTab) {
		this.tab = activeTab;
	};
});
