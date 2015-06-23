var app = angular.module('search-directives', []);

app.controller('searchDocsController', function ($scope) {
    $scope.items = [];

});

app.controller('newDocumentController', function ($scope, $routeParams) {
    $scope.caption = "Create a new Document";
    $scope.newDoc = new Entity();
    $scope.alertIsVisible = false;
    $scope.errorAlertIsVisible = false;
    $scope.pendingRequest = false;
    $scope.filename = '';
    
    $('.selectpicker').selectpicker();

    $scope.submit = function () {

    };

    $scope.reset = function () {
        $scope.newDoc = {};
    };
});
