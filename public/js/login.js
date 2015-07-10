var app = angular.module('login',[]);


app.controller('LoginCtrl', ['$scope','$http', function ($scope,$http) {

	$scope.logError = false;

	$scope.login = function(){
		$http.post("auth/auth.php",{auth:"2x567ijvbe",username: $scope.username, password: $scope.password}).success(function(a){
			console.log(a);
			if (a == "true") {
				window.location.reload();
			}
			else{
				$scope.logError = true;
				setTimeout(function(){
					$scope.logError = false;
				},3000);
			}
		}).error(function(a){
			console.log(a);
		});
	}

	
}])