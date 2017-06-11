<?php
require_once "./Dao/LoginDAO.php";
require_once "SupportService.php";
/***********************************************LOGIN Service****************************************/
/*AQU� LLAMAMOS AL DAO Y DEVOLVEMOS AL CLIENTE MEDIANTE ECHO*/
/*HABRA� QUE CONFIGURAR AQUI LOS CODIGOS DE ERROR*/
class LoginService {

	public static function comprobarLoginP($datos){
		$return = array();
		$dataArray = array();
		$dataArray = LoginDAO::checkP($datos);

		if(count($dataArray)!=0){
				
			$return['response'] = "Ok";
			$return['sip'] = $dataArray[0]['sip'];
			$return['password'] = $dataArray[0]['password'];


		}
		else{
			$return['response'] = "Error";
			$return['sip'] = "";
			$return['password'] = "";
		}
		
		echo json_encode($return);

	}
	public static function comprobarLoginU($datos){
		$return = array();
		$dataArray = array();
		$dataArray = LoginDAO::checkU($datos);
	
		if(count($dataArray)!=0){
	
			$return['response'] = "Ok";
			$return['id'] = $dataArray[0]['id'];
			$return['password'] = $dataArray[0]['password'];
			$return['rol'] = $dataArray[0]['rol'];
	
		}
		else{
			$return['response'] = "Error";
			$return['id'] = "";
			$return['password'] = "";
			$return['rol'] = "";
		}
	
		echo json_encode($return);
	
	}
	
}
?>