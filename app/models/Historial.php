<?php

class Historial extends Eloquent {

	protected $table = 'pedidos';

	public static function Ajax($param){
		switch ($param) {
			case 'all':
					echo self::where("user_id","=",User::AboutMe()->id)->get()->toJson();
				break;
			default:
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
