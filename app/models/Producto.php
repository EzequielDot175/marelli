<?php

class Producto extends Eloquent {

	protected $table = 'productos';

	public static function Ajax($param){
		switch ($param) {
			case 'byCategory':
					$id = e(Input::get('id'));
					$productos = Producto::where('categoria',"=",$id)->get()->toJson();
					echo($productos);
				break;
			
			default:
				# code...
				break;
		}
	}

}
