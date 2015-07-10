app.controller('HistorialCtrl', ['$scope','$http', function ($scope,$http) {
	$scope.pedidos;
	$scope.userData;
	$http.post("ajax",{get: 'historial', func: 'all'}).success(function(data){
		$scope.pedidos = data;
		$scope.userData = $.parseJSON(data[0].user_data);
	}).error(function(data){
		console.log(data);
	});
	$scope.nombre = "";
	// $scope.nombre = $.parseJSON($scope.pedidos[0].user_data).name;
	
	
}]);