var profileApp = angular.module("profileApp", []);

profileApp.controller("profileController", ['$scope', '$http', function($scope, $http) {
	$http.get('data/profile.json').success(function(data) {
		$scope.profile = data;
	});
}]);