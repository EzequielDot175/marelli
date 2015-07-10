<?php

use Illuminate\Auth\UserTrait;
use Illuminate\Auth\UserInterface;
use Illuminate\Auth\Reminders\RemindableTrait;
use Illuminate\Auth\Reminders\RemindableInterface;

class User extends Eloquent implements UserInterface, RemindableInterface {

	use UserTrait, RemindableTrait;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = array('password', 'remember_token');


	public static function Auth(){
		session_start();
		if (isset($_SESSION["Auth"])) {
			return $_SESSION["Auth"]["logged"];
		}else{
			return false;
		}
	}

	public static function AboutMe(){
		if (isset($_SESSION["Auth"])) {
			// return $_SESSION["Auth"]["logged"];
			$id = (int)$_SESSION["Auth"]["user"]["id"];
			return User::find($id);
		}else{
			return false;
		}
	}

}
