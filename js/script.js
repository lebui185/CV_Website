var profileApp = angular.module("profileApp", []);

profileApp.controller("profileController", function($scope) {
	
	$scope.profileImage = "img/lebui.jpg";
	$scope.name = "Le Bui Huu";
	$scope.headline = "Ho Chi Minh University of Science";
	$scope.nationality = "Vietnam";
	$scope.job = "Student";
	$scope.email = "lebui185@gmail.com";
	$scope.phoneNumber = "0936864850";
	
	$scope.summaryParagraphs = [
		"Currently CEO at LinkedIn, the web's largest and most powerful network of professionals.",
		"Prior to LinkedIn, was an Executive in Residence at Accel Partners and Greylock Partners. Primarily focused on advising the leadership teams of the firm's existing consumer technology portfolio companies while also working closely with the firm's partners to evaluate new investment opportunities.",
		"Previously served in key leadership roles at Yahoo! for over seven years, most recently as the Executive Vice President of Yahoo!'s Network Division managing Yahoo's consumer web product portfolio, including Yahoo's Front Page, Mail, Search, and Media products.",
		"Specialties: general management, corporate development, product development, business operations, strategy, product marketing, non-profit governance"
	];
	
	$scope.experience = [
		{position: "Junior Developer", company: "FPT Software", time: "December 2008 - December 2009", logo: "img/fpt.png"},
		{position: "Senior Developer", company: "VNG", time: "Jannuary 2010 - Jannuary 2012", logo: "img/vng.gif"},
		{position: "UI/UX Designer", company: "TMA Solution", time: "February 2012 - Present", logo: "img/tma.png"}
	];
	
	$scope.project = [
		{name: "Calculator", time: "June 2015 - July 2015", description: "Simple Calculator written in Java, JavaFX"},
		{name: "My Paint", time: "November 2015 - December 2015", description: "Free drawing program written in C#"},
		{name: "Gomoku", time: "December 2015 - Jannuary 2016", description: "Multiplayer Gomoku game written in C#"}
	];
	
	
	$scope.skills = [
		"Teamwork",
		"Presentation",
		"Non-profits",
		"Social Media",
		"Business Operations",
		"Leadership Development",
		"Computer Network",
		"Software Process",
		"C++",
		"C#",
		"Java",
		"HTML",
		"CSS",
		"Javascript",
		"Bootstrap",
		"AngularJS",
		"ASP.NET",
		"Linux"
	];
	
	$scope.education = [
		{name: "Ho Chi Minh University of Science", degree: "Bachelor's degree", time: "2013-2017", logo: "img/hcmus.png"}
	];
});