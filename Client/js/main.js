
var app = angular.module('jsdms-client', ['admin-directives']);

app.controller('tabController', function () {
	this.tab = 0;

	this.isSet = function (checkTab) {
		return this.tab === checkTab;
	};

	this.setTab = function (activeTab) {
		this.tab = activeTab;
	};
});
