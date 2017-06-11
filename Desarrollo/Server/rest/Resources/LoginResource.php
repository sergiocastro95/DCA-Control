<?php
require_once "./Services/LoginService.php";

/***********************************************LOGIN****************************************/
class LoginResource{
	public static function methodLogin($method,$type){   //filtra por metodo
		switch ($method) {
			case 'POST'://inserta
				LoginResource::postLogin($type);
				break;
			default://metodo NO soportado
				header('HTTP/1.1 501 Not Implemented'+$method);
				break;
		}

	}
	public static function postLogin($type){

		$obj = json_decode( file_get_contents('php://input'));
		$objArr = (array)$obj;

		switch ($type) {
			case '4':   //login/password
				if($_GET['resource2']=="paciente"){
					$dataArray = LoginService::comprobarLoginP($objArr);
				}else if($_GET['resource2']=="usuario"){
					$dataArray = LoginService::comprobarLoginU($objArr);
				}
				break;
			default:
				header('HTTP/1.1 405 Method Not Allowed');

				break;
		}
	}
}
?>