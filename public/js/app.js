var app = angular.module('app',['ngRoute','LocalStorageModule']);


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
                .when('/historial/:id',{
                        templateUrl: 'templates/historial_detalle.html',
                        controller: 'HistorialCtrl'
                })
                .otherwise({
                	redirectTo: '/productos'
                });
}]);











