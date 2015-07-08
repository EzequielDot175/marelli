<?php

class Producto extends Eloquent {

	protected $table = 'productos';

	public static function Ajax($param){
		switch ($param) {
			case 'byCategory':
					$id = e(Input::get('id'));
					$productos = Producto::where('categoria',"=",$id)->take(20)->get()->toJson();
					echo($productos);
				break;
			
			default:
				# code...
				break;
		}
	}

}
