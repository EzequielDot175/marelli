

var app = angular.module('app',['ngRoute','LocalStorageModule']);

var push = [];



app.directive('categoriaGaleria', [function () {
	return {
		restrict: 'A',
		link: function (scope, element, iAttrs) {
			var el = $(element);
			var top = $('#gal-top');
			var bottom = $('#gal-bottom');
			var overflow = el.find('.overflow');

			var globalH;
			var current_part = 0;

			top.hide();

			bottom.on('click', function(event) {
				var height = overflow.height();

				var itemHeight = $($('.item')[0]).height();
				var itemMarginBottom = parseFloat($($('.item')[0]).css("margin-bottom"));
				var sumHeight = (itemHeight+itemMarginBottom)*6;
				console.log(sumHeight);
				globalH = height;
				current_part++;

				el.animate({scrollTop: current_part*sumHeight }, 1000);
				console.log(current_part);
				var parts = height / sumHeight;
				var parts = Math.round(parts - 0.3);
				console.log(parts);
				if (parts == current_part) {
					top.show();
					bottom.hide();
				}
			});

			top.on('click', function(event) {
				var height = overflow.height();

				var itemHeight = $($('.item')[0]).height();
				var itemMarginBottom = parseFloat($($('.item')[0]).css("margin-bottom"));
				var sumHeight = (itemHeight+itemMarginBottom)*6;
				console.log(sumHeight);
				globalH = height;
				current_part--;
				el.animate({scrollTop: current_part*sumHeight }, 1000);
				console.log(current_part);
				var parts = height / sumHeight;
				var parts = Math.round(parts);
				console.log(parts);
				if (0 == current_part) {
					top.hide();
					bottom.show();
				}
			});

			
			// $(element)
		}
	};
}]);

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
                .when('/historial/',{
                	templateUrl: 'templates/historial.html',
                	controller: 'HistorialCtrl'
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

	this.equals = function(a,b){
		
		// console.log(result);
		// return result;
	}
	this.add = function(item){
		var result = false;
		var key = 0;
		$.each(this.pedidos, function(index, val) {
			if (val.producto_interno == item.producto_interno) {
				key = index;
				result = true;
			}
		});
		if (result) {
			var sum = this.pedidos[key].cantidad + item.cantidad
			this.pedidos[key].cantidad = sum;
		}else{
			this.pedidos.push(item)
		}
		
	}
	this.get = function(){
		return this.pedidos;
		
	}
}]);

app.controller('IndexCtrl', ['$scope','$location', function ($scope,$location) {
	$location.path('/productos');
}]);



app.controller('HistorialCtrl', ['$scope', function ($scope) {
	
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

	$scope.valid = function(item){
		if (parseInt(item.cantidad) > 0) {
			item.valid = true;
		}else{
			item.valid = false;
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
		cPedidos.add(newItem);
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
	$scope.searchByCode;


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

