<?php

class Categoria extends Eloquent {

	protected $table = 'categorias';

	public static function Ajax($param){
		switch ($param) {
			case 'all':
				// All method
					$categorias =  self::all()->toJson();
					echo($categorias);
				// All method end
				break;
			case 'getName':
					$name = Categoria::where("id_marelli","=",e(Input::get('id')))->take(1)->get()->toJson();
					echo($name);
				break;
			
			default:
				# code...
				break;
		}
	}

}
