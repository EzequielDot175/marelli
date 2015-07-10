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