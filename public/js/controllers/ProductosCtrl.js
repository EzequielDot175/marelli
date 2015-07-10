

app.controller('ProductosCtrl', ['$scope','$http','localStorageService','$location','PedidosService', function ($scope,$http,storage,$location,pedidos) {

	if (storage.get('categorias')) {
			$scope.categorias = storage.get('categorias');
	}else{
		$http.post('ajax', {get:'categorias',func: 'all'}).
		  success(function(data, status, headers, config) {
			$scope.categorias = data;
			storage.set('categorias',data);
		  }).
		  error(function(error, status, headers, config) {
		  	console.log(error);
		  });
	}

	$scope.iterator = function(a){
		if (a % 2 == 0) {
			return 1;
		}else{
			return 2;
		}
	};
	$scope.item = function(a){
		$location.path('/productos/categoria/'+a.id_marelli);
		// $scope.$apply();
	}

	$scope.firstletter = function(obj){
		if ($scope.search != undefined && $scope.search != "") {
			return obj.nombre[0] == $scope.search.toUpperCase();
		}else{
			return obj;
		}
	}

	
}]);
