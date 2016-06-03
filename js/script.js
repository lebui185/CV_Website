function isEmptyOrWhiteSpace(str) {
	return (str.length === 0 || !str.trim());
}

function isEmailLike(str) {
	var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(str);
}

function isNumber(str) {
	var re = /^\d+$/;
    return re.test(str);
}

var profileApp = angular.module('profileApp', ['ui.bootstrap', 'ngSanitize', 'firebase']);

profileApp.factory("Auth", function($firebaseAuth) {
	var ref = new Firebase("https://1312318.firebaseio.com/");
	return $firebaseAuth(ref);
});

profileApp.controller("profileController", function($scope, $http, $uibModal, $firebaseObject, Auth) {
	window.sc = $scope;

	Auth.$onAuth(function(authData) {
		$scope.authData = authData;

		if (authData) {
			var ref = new Firebase("https://1312318.firebaseio.com/");
			var profile = $firebaseObject(ref);

			profile.$loaded().then(function() {
				$scope.profile = profile;

				for (var i = 0; i < $scope.profile.experience.length; i++) {
					$scope.profile.experience[i].startDate = new Date($scope.profile.experience[i].startDate);
					$scope.profile.experience[i].endDate = new Date($scope.profile.experience[i].endDate);
				}

				for (var i = 0; i < $scope.profile.project.length; i++) {
					$scope.profile.project[i].startDate = new Date($scope.profile.project[i].startDate);
					$scope.profile.project[i].endDate = new Date($scope.profile.project[i].endDate);
				}

				for (var i = 0; i < $scope.profile.education.length; i++) {
					$scope.profile.education[i].startDate = new Date($scope.profile.education[i].startDate);
					$scope.profile.education[i].endDate = new Date($scope.profile.education[i].endDate);
				}

				// name
				$('#name').editable({
					title: 'Enter name',
					placement: 'right',
					send: 'never',
					value: $scope.profile.name,
					'tpl': '<input type="text" style="width: 250px">',
					validate: function(value) {
						if (isEmptyOrWhiteSpace(value)) {
							return "Please enter a value.";
						}
					}
				});

				$('#name').on('save', function(e, params) {
					$scope.profile.name = params.newValue;
				});

				// headline
				$('#headline').editable({
					title: 'Enter headline',
					type: 'text',
					placement: 'right',
					value: $scope.profile.headline,
					'tpl': '<input type="text" style="width: 350px">',
					validate: function(value) {
						if (isEmptyOrWhiteSpace(value)) {
							return "Please enter a value.";
						}
					}
				});

				$('#headline').on('save', function(e, params) {
					$scope.profile.headline = params.newValue;
				});

				// country
				$('#country').editable({
					title: 'Select country',
					type: 'select',
					placement: 'right',
						source: ["Vietnam", "Thailand"],
				});

				$('#country').on('save', function(e, params) {
					$scope.profile.country = params.newValue;
				});

				// field
				$('#field').editable({
					title: 'Enter field',
					type: 'text',
					placement: 'right',
					value: $scope.profile.field,
					validate: function(value) {
						if (isEmptyOrWhiteSpace(value)) {
							return "Please enter a value.";
						}
					}
				});

				$('#field').on('save', function(e, params) {
					$scope.profile.field = params.newValue;
				});

				// email
				$('#email').editable({
					title: 'Enter email',
					type: 'text',
					placement: 'right',
					value: $scope.profile.email,
					validate: function(value) {
						if (!isEmailLike(value)) {
							return "Please enter an email.";
						}
					}
				});

				$('#email').on('save', function(e, params) {
					$scope.profile.email = params.newValue;
				});

				// phoneNumber
				$('#phoneNumber').editable({
					title: 'Enter Phone number',
					type: 'text',
					placement: 'right',
					value: $scope.profile.phoneNumber,
					validate: function(value) {
						if (!isNumber(value)) {
							return "Please enter a phone number.";
						}
					}
				});

				$('#phoneNumber').on('save', function(e, params) {
					$scope.profile.phoneNumber = params.newValue;
				});

				// summary
				$('#summary').editable({
					title: 'Enter summary',
					type: 'textarea',
					placement: 'right',
					mode: 'inline',
					value: $scope.profile.summary,
					tpl: '<textarea style="width:1024px"></textarea>'
				});

				$('#summary').on('save', function(e, params) {
					$scope.profile.summary = params.newValue;
				});

				// function
				$scope.openExperienceModal = function(experienceItem) {
					var modalInstance = $uibModal.open({
						animation: $scope.animationsEnabled,
						templateUrl: 'modal/experienceModal.html',
						controller: 'modalController',
						resolve: {
						item: function () {
					 		return experienceItem;
						}
					}
				});
				};

				$scope.openProjectModal = function(projectItem) {
					var modalInstance = $uibModal.open({
						animation: $scope.animationsEnabled,
						templateUrl: 'modal/projectModal.html',
						controller: 'modalController',
						resolve: {
						item: function () {
					 		return projectItem;
						}
					}
				});
				};

				$scope.openEducationModal = function(educationItem) {
					var modalInstance = $uibModal.open({
						animation: $scope.animationsEnabled,
						templateUrl: 'modal/educationModal.html',
						controller: 'modalController',
						resolve: {
						item: function () {
					 		return educationItem;
						}
					}
				});
				};

				$('#change-picture-input').on('change', function(e){
					$scope.$apply(function() {
				        $scope.profile.profileImage = URL.createObjectURL(e.target.files[0]);
				    });
				})
			});
		}
		else {
			$scope.profile = undefined;
		}
	});

	$scope.login = function(site) {
		Auth.$authWithOAuthPopup(site, {
			remember: "sessionOnly",
		}).catch(function(authData) {
			console.error(authData);
		});
	}

	$scope.logout = function() {
		Auth.$unauth();
	}

	
});

//modalController
profileApp.controller('modalController', function ($scope, $uibModalInstance, item) {
	$scope.cloneItem = jQuery.extend(true, {}, item);

	$scope.close = function() {
		$uibModalInstance.close();
	}

	$scope.saveChange = function() {
		angular.copy($scope.cloneItem, item);
		$uibModalInstance.close();
	}
});

profileApp.filter("monthYearFilter", function($filter) {
	return function(data) {
		var monthNames = ["January", "February", "March", "April", "May", "June",
			"July", "August", "September", "October", "November", "December"
		];
        return monthNames[data.getMonth()] + ' ' + (data.getYear() + 1900);
	};
});

profileApp.filter("yearFilter", function($filter) {
	return function(data) {
        return data.getYear() + 1900;
	};
});

profileApp.filter("nl2br", function($filter) {
	return function(data) {
		if (!data) return data;
			return data.replace(/\n\r?/g, '<br/>');
	};
});