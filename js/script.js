var profileApp = angular.module("profileApp", ['ngSanitize']);

profileApp.controller("profileController", ['$scope', '$http', function($scope, $http) {
	window.sc = $scope.profile;
	
	$http.get('data/profile.json').success(function(data) {
		$scope.profile = data;
	});
}]);

profileApp.filter("nl2br", function($filter) {
	return function(data) {
		if (!data) return data;
			return data.replace(/\n\r?/g, '<br/>');
	};
});