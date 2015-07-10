

app.controller('PedidosCtrl', ['$scope','PedidosService','localStorageService','$location','$rootScope','$http', function($scope,pedidos,storage,$location,$rootScope,$http) {


	$scope.pedidos = pedidos.get();

	$rootScope.$on("$locationChangeStart", function(event, next, current) { 
       if ($location.path() == "/confirmar/") {
			$scope.VisibilidadCarrito = false;
		}else{
			$scope.VisibilidadCarrito = true;
		}
     });
	$scope.ifpedidos = function(){
		if ($scope.pedidos.length > 0) {
			return true;
		}else{
			return false;
		}
	};

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