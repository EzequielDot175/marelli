<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('index');
});
Route::post("/ajax", function(){
	switch (Input::get('get')):
			case 'categorias':
					Categoria::Ajax(Input::get('func'));
				break;
			case 'productos':
					Producto::Ajax(Input::get('func'));
				break;
			
			default:
				# code...
				break;
	endswitch;
});
