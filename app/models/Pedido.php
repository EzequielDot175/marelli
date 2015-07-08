<?php

class Pedido extends Eloquent {

	protected $table = 'pedidos';

	public static function Ajax($param){
		switch ($param) {
			case 'confirm':
				// All method
					$pedido = Input::get('list');
					$x = new Pedido();
					$x->id = self::random();
					$x->user_id = 4;
					$x->pedido_data = self::ArrayToJSON($pedido);
					if($x->save()):
						echo("true");
					else:
						echo("false");
					endif;
				// All method end
				break;
			
			default:
				# code...
				break;
		}
	}

	public static function ArrayToJSON($param){
		$array = array();
		foreach($param as $k => $v):
			$array[] = (object)$v;
		endforeach;
		return json_encode($array);
	}
	public static function random(){
		return strtoupper(substr(md5(Session::token().rand()), 0,50));

	}

}
