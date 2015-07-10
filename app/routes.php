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
Route::get("/logout", function(){
	Auth::logout();
});

Route::get('/', function()
{
	if (User::Auth()) {
		return View::make('index');
	}else{
		return View::make("login");
	}
});
Route::post("/ajax",function(){
	if (User::Auth()) {
		switch (Input::get('get')):
				case 'categorias':
						Categoria::Ajax(Input::get('func'));
					break;
				case 'productos':
						Producto::Ajax(Input::get('func'));
					break;
				case 'pedidos':
						Pedido::Ajax(Input::get('func'));
					break;
				case 'historial':
						Historial::Ajax(Input::get('func'));
					break;

				default:
					# code...
					break;
		endswitch;
	}
	
});

Route::post("/auth", function(){
	switch (Input::get('get')) {
		case 'login':
			$credentials = array(
				"email" => e(Input::get("username")),
				"password" => e(Input::get("password"))
			);
			if (Auth::attempt($credentials, true, true)) {
				echo "true";
			}else{
				echo "false";
			}
			break;
		case 'logout':
				if (Auth::logout()) {
					echo "true";
				}
			break;
		
		default:
			# code...
			break;
	}
});
