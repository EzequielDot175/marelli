var app = angular.module('app',['react','ngRoute','LocalStorageModule']);

var push = [];

app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        		.when('/', {
        			templateUrl: 'templates/index.html',
        			controller: 'IndexCtrl'
        		})
                .when('/productos',{
                	templateUrl: 'templates/productos.html',
                	controller: 'ProductosCtrl'
                })
                .when('/productos/categoria/:id',{
                	templateUrl: 'templates/productos_categoria_list.html',
                	controller: 'ProductosCategoriaCtrl'
                })
                .when('/confirmar/',{
                	templateUrl: 'templates/pedido_confirmar.html',
                	controller: 'PedidosCtrl'
                })
                .otherwise({
                	redirectTo: '/productos'
                });
}]);


app.service('PedidosService', ['localStorageService',function (storage) {
	this.pedidos = [];

	if (storage.get('pedido')) {
		this.pedidos = storage.get('pedido');
	};

	this.add = function(item){
		this.pedidos.push(item);
	}
	this.get = function(){
		return this.pedidos;
		
	}
}]);

app.controller('IndexCtrl', ['$scope','$location', function ($scope,$location) {
	$location.path('/productos');
}]);

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
	$scope.add = function(a){
		var newItem = {};
			newItem.cantidad = a.cantidad;
			newItem.catName = $scope.categoryName;
			newItem.categoria = a.categoria;
			newItem.created = new Date();
			newItem.producto_descripcion = a.producto_descripcion;
			newItem.producto_id = a.producto_id;
			newItem.producto_interno = a.producto_interno;
		cPedidos.add(newItem);
	}
	$scope.export = function(){
		// console.log('func');
		$http.post("ajax",{get: "productos", func: "excelByCategory",catName: $scope.categoryName,id: $routeParams.id}).success(function(a){
			// window.location.href = a;
			console.log(a);
			// console.log(a);
			// console.log(a);
		}).error(function(a){

		});
	}

}]);



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


	$scope.item = function(a){
		$location.path('/productos/categoria/'+a.id_marelli);
		// $scope.$apply();
	}
	// console.log($scope.categorias);
	
}]);


app.controller('PedidosCtrl', ['$scope','PedidosService','localStorageService','$location','$rootScope','$http', function($scope,pedidos,storage,$location,$rootScope,$http) {

	$scope.pedidos = pedidos.get();

	$rootScope.$on("$locationChangeStart", function(event, next, current) { 
       if ($location.path() == "/confirmar/") {
			$scope.VisibilidadCarrito = false;
		}else{
			$scope.VisibilidadCarrito = true;
		}
     });


	$scope.$watch(function(){
		return pedidos.pedidos;
	},function(a,b){
		storage.set('pedido',pedidos.get());
		$scope.pedidos = pedidos.get();
	},true);

	$scope.del = function(index){
		if (confirm("¿Esta seguro de realizar esta accion?")) {
			$scope.pedidos.splice(index, 1);
		};
	}
	$scope.confirmar = function(){
		console.log();
		if ($scope.pedidos.length > 0) {
			$http.post("ajax",{get:'pedidos',func: 'confirm', list: $scope.pedidos}).success(function(data){
				console.log(data);
				if (data == "true") {
					alert("Pedido guardado correctamente!");
					pedidos.pedidos = [];
					$location.path('/productos');
				};
			}).error(function(error) {
				console.log(error);
			});
		}else{
			alert("No se puede guardar la petición, esta vacia.");
		}
	}


}]);

