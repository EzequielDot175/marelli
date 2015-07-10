<?php 
	error_reporting(0);
	ini_set("display_errors", 0);
	class Auth
	{
		private $db;
		private $dbuser = "dev_marelli";
		private $dbname = "dev_marelli";
		private $dbpass = "#Tv1#Poni-vD";
		const HASH = '2a07somestringDONTTOUCHTHIS';


		public function __construct()
		{
			$this->db = new PDO('mysql:host=localhost;dbname='.$this->dbname, $this->dbuser, $this->dbpass);
		}
		public function login($auth){
			session_start();
			$db = $this->db;
			$verify = $db->prepare("SELECT COUNT(id) as exist FROM users WHERE email = :email AND password = :password");
			$verify->bindParam(":email",$auth["username"], PDO::PARAM_STR);
			$verify->bindParam(":password",$this->generate($auth["password"]), PDO::PARAM_STR);
			$verify->execute();
			$result = $verify->fetch();
			if ($result["exist"] == 1) {
				$_SESSION["Auth"]["logged"] = true;
				$_SESSION["Auth"]["date"] = date('l jS \of F Y h:i:s A');
				$_SESSION["Auth"]["user"] = $this->getUser($auth["username"]);
				echo("true");
			}else{
				echo("false");
			}

		}
		private function generate($var){
			if (CRYPT_BLOWFISH == 1) {
			    return substr(crypt($var,self::HASH), 0,50);
			}
		}
		public function logout(){
			session_start();
			unset($_SESSION["Auth"]);
		}
		private function format($data){
			$array = array();
			$array["name"] = $data["name"];
			$array["lastname"] = $data["lastname"];
			$array["user_level"] = $data["user_level"];
			$array["id"] = $data["id"];
			return $array;
		}
		private function getUser($email){
			$user = $this->db->prepare("SELECT * FROM users WHERE email = :email");
			$user->bindParam(":email",$email, PDO::PARAM_STR);
			$user->execute();
			return $this->format($user->fetch());
		}
		private function check($password){

		}
	}


	if(isset($_SERVER["CONTENT_TYPE"]) && strpos($_SERVER["CONTENT_TYPE"], "application/json") !== false) {
	    $_POST = array_merge($_POST, (array) json_decode(trim(file_get_contents('php://input')), true));
	    if (isset($_POST["auth"])) {
			$x = new Auth();
			$x->login(array("username" => $_POST["username"] , "password" => $_POST["password"]));
		}
	}
	

 ?>