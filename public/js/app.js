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
                .otherwise({
                	redirectTo: '/productos'
                });
}]);


app.service('PedidosService', [function () {
	this.pedidos = [];
	this.add = function(){
		this.pedidos.push({element:"asdasd"});
	}
	this.get = function(){
		return this.pedidos;
	}
}]);

app.controller('IndexCtrl', ['$scope', function ($scope) {
	
}]);

app.controller('ProductosCategoriaCtrl', ['$scope','$http','$location','$routeParams', function ($scope,$http,$location,$routeParams) {

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
		var item = a;
		console.log(item);

	}

}]);

app.controller('ProductosCtrl', ['$scope','$http','localStorageService','$location','PedidosService', function ($scope,$http,storage,$location,pedidos) {

	if (storage.get('categorias')) {
			console.log('Cargado desde session');
			$scope.categorias = storage.get('categorias');
	}else{
			console.log('Cargado desde post');

		$http.post('ajax', {get:'categorias',func: 'all'}).
		  success(function(data, status, headers, config) {
			$scope.categorias = data;
			storage.set('categorias',data);
		  }).
		  error(function(error, status, headers, config) {
		  	console.log(error);
		  });
	}

	// setInterval(function(){
	// 	$scope.$apply(function(){
	// 		pedidos.pedidos.push({"element": "asdasdas"});
	// 	});
	// }, 3000);

	$scope.item = function(a){
		console.log(a);
		$location.path('/productos/categoria/'+a.id_marelli);
		$scope.$apply();
	}
	// console.log($scope.categorias);
	
}]);


app.controller('PedidosCtrl', ['$scope','PedidosService', function($scope,pedidos) {
	
	
	// $scope.$watch(function(){
	// 	return pedidos.pedidos;
	// },function(a,b){
	// 	console.log(a);
	// 	console.log(b);
	// },true);
	// console.log(pedidos.pedidos);	
}]);

