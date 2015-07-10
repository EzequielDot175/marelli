app.controller('ProductosCategoriaCtrl', ['$scope','$http','$location','$routeParams','localStorageService','PedidosService', function ($scope,$http,$location,$routeParams,storage,cPedidos) {

	$scope.list = [];
	$scope.categoryName = "";

	$http.post('ajax', {get:'productos',func: 'byCategory',id: $routeParams.id}).
		  success(function(data, status, headers, config) {
			$scope.list = data;
		  }).
		  error(function(error, status, headers, config) {
		  	console.log(error);
		  });

	$http.post('ajax', {get:'categorias',func: 'getName',id: $routeParams.id}).
		  success(function(data, status, headers, config) {
			$scope.categoryName = data[0].nombre;
		  }).
		  error(function(error, status, headers, config) {
		  	console.log(error);
		  });

	$scope.valid = function(item){
		if (parseInt(item.cantidad) > 0) {
			item.valid = true;
		}else{
			item.valid = false;
			item.cantidad = 0;
		}

	}

	$scope.add = function(a){

		var newItem = {};
			newItem.cantidad = a.cantidad;
			newItem.catName = $scope.categoryName;
			newItem.categoria = a.categoria;
			newItem.created = new Date();
			newItem.producto_descripcion = a.producto_descripcion;
			newItem.producto_id = a.producto_id;
			newItem.producto_interno = a.producto_interno;

		console.log(newItem.cantidad);
		if (newItem.cantidad > 0) {
			cPedidos.add(newItem);
		};
		a.cantidad = "";
		a.valid = false;
	}
	$scope.export = function(){
		// console.log('func');
		$http.post("ajax",{get: "productos", func: "excelByCategory",catName: $scope.categoryName,id: $routeParams.id}).success(function(a){
			window.location.href = a;
			// console.log(a);
			// console.log(a);
			// console.log(a);
		}).error(function(a){

		});
	}
	$scope.notNegative = function(){

	};


}]);
