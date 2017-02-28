// Main module.
var app = angular.module('issueTrackerApp', ['ngRoute']);

// Issues array.
app.value('issues', JSON.parse(localStorage.getItem('issues')) || []);

// Main controller.
app.controller('issueTrackerCtrl', ['$rootScope', '$scope', '$location', 'issues', function($rootScope, $scope, $location, issues){
	$rootScope.issues = issues;
	$rootScope.currentTab = 'High';
	$rootScope.location = $location;
	$rootScope.isEdit = false;

	window.onbeforeunload = function(event) {
		localStorage.setItem('issues', JSON.stringify($scope.issues));
        return;
    };
}]);

// Issues list controller.
app.controller('issuesListCtrl', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.deleteIssue = function(id) {
		if (confirm("Delete this issue?")) {
			for (var i = 0; i < $scope.issues.length; i++) {
				if ($scope.issues[i].id == id) {
					$scope.issues.splice(i, 1);
					localStorage.setItem('issues', JSON.stringify($scope.issues));
				}
			}
		}
	};

	$scope.toggleIssue = function(id) {
		for (var issue of $scope.issues) {
			if (issue.id == id) {
				issue.status = issue.status!=="Closed"?"Closed":"Reopened";
				localStorage.setItem('issues', JSON.stringify($scope.issues));
			}
		}
	};

	$scope.changeTab = function(severity) {
		$rootScope.currentTab = severity;
	};

	$scope.saveEdit = function(issue) {
		issue.editMode = false;
		$rootScope.isEdit = false;
		localStorage.setItem('issues', JSON.stringify($scope.issues));
	}
}]);

// Create issue controller.
app.controller('createIssueCtrl', ['$scope', '$rootScope', '$location', function($scope, $rootScope, $location){
	$scope.createIssue = function($event) {
		var issue = {
			id: chance.guid(),
			description: $scope.description,
			severity: jq("#issueSeverityInput").val(),
			assignedTo: $scope.assignTo,
			status: "Opened",
			editMode: false,
			pinned: false
		};

		// Clear form inputs.
		jq("#issueInputForm")[0].reset();

		$scope.issues.push(issue);
		localStorage.setItem('issues', JSON.stringify($scope.issues));

		$location.url('/');
		$rootScope.currentTab = issue.severity;
	};
}]);

// Issue directive.
app.directive('issue', function(){
	return {
		restrict: 'E',
		templateUrl: 'issue-template.html'
	};
});

// Set router.
app.config(function($routeProvider, $locationProvider){
	$routeProvider.
		when('/', {
			templateUrl: 'issues.html'
		})
		.when('/issue', {
			templateUrl: 'issue.html'
		})
		.otherwise('/');
});

// Set custom filter.
app.filter('display', function() {
	return function(issues, severity) {
		var out = [];

		var pinned = [];
		var opened = [];
		var reopened = [];
		var closed = [];

		angular.forEach(issues, function(issue) {
			if (issue.severity === severity) {
				if (issue.pinned)
					pinned.push(issue);
				else if (issue.status === 'Opened')
					opened.push(issue);
				else if (issue.status === 'Reopened')
					reopened.push(issue);
				else if (issue.status === 'Closed')
					closed.push(issue);
			}
		});

		out = pinned.concat(opened).concat(reopened).concat(closed);

		return out;
	}
})
