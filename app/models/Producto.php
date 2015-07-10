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
			case 'excelByCategory':
					// print_r(Input::all());
					$catName = utf8_decode(utf8_encode(Input::get('catName')));
					$id = Input::get('id');
					$productos = Producto::where("categoria","=",$id)->get()->toArray();
							
					$lista = self::formatExcel($productos);

					Excel::create("CAT".$id, function($excel) use ($lista) {

						 $excel->sheet('productos', function($sheet)  use ($lista) {
						 	
						    $sheet->fromArray($lista, null, 'A0', true);

						});
					})->store('xls', public_path('/exports/categoria'));
					echo(url("exports/categoria/CAT".$id.".xls"));
				break;
			
			default:
				# code...
				break;
		}
	}



	public static function formatExcel($excel){
		$file = array();
		$file[] = array('ID','CATEGORIA','PRODUCTO','NOMBRE','CANTIDAD');

		foreach ($excel as $key => $value) {
			$file[] = array(
				$value['producto_interno'],
				$value['categoria'],
				$value['producto_id'],
				$value['producto_descripcion']
			);
			
		}
		return $file;
	}

}
